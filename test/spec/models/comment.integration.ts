import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Board from "../../../src/models/domain/board";
import Comment from "../../../src/models/domain/comment";


describe("[integration] 댓글 모델을 테스트 중입니다.",function(){

  //비동기를 위해 sync를 맞추는 promise구조 hook작업이군
  before((done: Function) => {
    sequelize.sync().then(() => {
      //싱크가 잘맞으면 성공이고,
      done();
    }).catch((error: Error) => {
      //싱크가 안맞으면 에러를 뿜습니다.
      done(error);
    });
  });

  // 그럼 테스트를 시작하기 전에 깨끗하게 모든 걸 지워 보실까? truncate : table 로우를 다 지우는 데이터 무결성 파괴의 주범.
  // 어차피 게시판과 댓글 둘 다 초기화 시켜야되는 거면, 게시글을 초기화 시키면 댓글도 자동으로 지워진다.
  const cleanUp = (cb) => Board.destroy({where: {}, truncate: true}).then(() => cb());

  //모든 테스트를 시작하기 전에 초기화
  beforeEach((done: Function)=>{
    cleanUp(()=>done());
  });

  //주어진 객체를  Board모델에 저장하는 메서드
  const saveBoard = (given, cb) => {
    const board = new Board(given);
    board.save()
      .then((saveBoard: Board) => {
        cb(saveBoard);
      });
  };

  //주어진 객체를 Comment모델에 저장하는 메서드

  const saveComment = (given, cb) => {
    const comment = new Comment(given);
    comment.save()
      .then((saveComment: Comment) => {
        cb(saveComment);
      });
  };


  it('댓글을 추가한다', function(done){
    let givenComment = { content:'댓글 내용1', writer:'댓글 작성자1'};

    saveComment(givenComment, (saveComment: Comment) => {
      expect(saveComment.content).to.be.eql(givenComment.content);
      expect(saveComment.writer).to.be.eql(givenComment.writer);
      done();
    });
  });

  it('댓글을 조회한다', function(done){
    let givenComment = { content:'댓글 내용1', writer:'댓글 작성자1'};

    saveComment(givenComment, (saveComment: Comment)=>{
      Comment.findOne<Comment>({where:{writer:'댓글 작성자1'}})
        .then((board: Comment) => {
          expect(board.writer).to.be.equal(givenComment.writer);
          done();
        });
    });
  });

  it('댓글을 변경한다.', function(done){
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};
    let updateComment = {content:'변경된 댓글 내용1', writer:'변경된 댓글 작성자1'};

    saveComment(givenComment, (saveComment: Comment)=>{
      Comment.update({content:'변경된 댓글 내용1', writer:'변경된 댓글 작성자1'},{where:{writer:'글 작성자1'}}).then(()=>{
        //findOne으로 찾은 Comment 모델 안의 객체를 comment라는 변수에 저장해서 함수의 파라미터로 넘긴다. 이걸 이해하기 힘들었네.
        Comment.findOne<Comment>({where: {writer:'변경된 댓글 작성자1'}})
          .then((comment: Comment) => {
            //댓글은 내용과 작성자만 만들어놨으므로 title 해놓으면 에러난다.
            expect(comment.content).to.be.equal(updateComment.content);
            expect(comment.writer).to.be.equal(updateComment.writer);
            done();
          });
      });
    });
  });

  it('댓글을 삭제한다.',function(done){
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};

    saveComment(givenComment, (saveComment: Comment) =>{
      Comment.destroy({where:{writer:'댓글 작성자1'}}).then(()=>{
        Comment.findOne<Comment>({where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then((comment: Comment)=>{
          expect(comment).to.be.equal(null);
          done();
        });
      });
    });
  });

  it('게시판 추가 후 댓글을 추가 한다.', (done: Function) =>{
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};

    saveBoard(givenBoard, (saveBoard: Board) => {
      saveComment(givenComment, (saveComment: Comment) => {
        saveBoard.$add('Comment', saveComment);
        Board.findOne<Board>({include:[Comment]}).then((board: Board) => {
          Comment.findOne<Comment>({where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then((comment: Comment)=>{

            expect(board.comments.length).to.be.equal(1);
            expect(board.comments[0].content).to.be.equal(givenComment.content);
            expect(board.comments[0].writer).to.be.equal(givenComment.writer);
            // expect(comment.writer).to.be.equal(givenComment.writer);
            done();
          });
        });
      });
    });

    // TODO: 이건 왜 안될까?
    // saveBoard(givenBoard, (saveBoard: Board)=>{
    //   Board.findOne<Board>({where:{title:'글 제목1', content:'글 내용1', writer:'글 작성자1'}})
    //     .then((board: Board)=>{
    //       expect(board.title).to.be.equal(givenBoard.title);
    //       expect(board.content).to.be.equal(givenBoard.content);
    //       expect(board.writer).to.be.equal(givenBoard.writer);
    //       done();
    //   });
    // });
  });

  it('게시판 추가 후 댓글을 업데이트 한다.', (done: Function)=>{
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};
    let updateComment = {content:'변경된 댓글 내용1', writer:'변경된 댓글 작성자1'};

    saveBoard(givenBoard, (saveBoard: Board)=>{
      saveComment(givenComment, (saveComment: Comment)=>{
        saveBoard.$add('Comment', saveComment);
        Board.findOne<Board>({include:[Comment]}).then((board: Board)=>{
          Comment.findOne<Comment>({where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then(()=>{
            Comment.update(updateComment,{where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then(()=>{
              Comment.findOne<Comment>({where:{content:'변경된 댓글 내용1', writer:'변경된 댓글 작성자1'}}).then((comment: Comment)=> {

                expect(board.comments.length).to.be.equal(1);
                expect(comment.content).to.be.equal(updateComment.content);
                expect(comment.writer).to.be.equal(updateComment.writer);

                // update가 반영된 board 객체를 다시 불러와야 update된 comments의 content속성을 참조할 수 있다.
                // 내가 참조하는 객체는 참조하는 당시의 값이지, db와 실시간으로 미러링이 되지 않는다는 점을 잘 기억할 것.
                Board.findOne<Board>({where:{title:'글 제목1', content:'글 내용1', writer:'글 작성자1'}}).then((board: Board)=>{
                  expect(board.comments[0].content).to.be.equal(updateComment.content);
                });

                done();
              });
            });
          });
        });
      });
    });
  });

  it.only('게시판 추가 후 댓글을 삭제한다.', (done: Function) => {
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};

    saveBoard(givenBoard, (saveBoard: Board)=>{
      saveComment(givenComment, (saveComment: Comment)=>{
        saveBoard.$add('Comment', saveComment);
        Comment.destroy({where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then(() => {
          Comment.findOne<Comment>({where:{content:'댓글 내용1', writer:'댓글 작성자1'}}).then((comment: Comment)=>{

            expect(comment).to.be.equal(null);

            //destroy가 반영된 후에 Board모델 객체를 참조하여 연결된 comments 모델에 할당된 값이 없는 것을 확인한다.
            Board.findOne<Board>({where:{title:'글 제목1', content:'글 내용1', writer:'글 작성자1'}}).then((board: Board)=>{
              expect(board.comments[0].content).to.be.equal(undefined);
            });

            done();

          });
        });
      });
    });
  });

});