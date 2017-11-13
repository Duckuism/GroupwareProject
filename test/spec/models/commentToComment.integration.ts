import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Board from "../../../src/models/domain/board";
import Comment from "../../../src/models/domain/comment";
import CommentToComment from "../../../src/models/domain/commentToComment";

describe("[intergration] 대댓글 모델 테스트", function () {

  before((done: Function) => {
    sequelize.sync().then(()=>{
      done();
    }).catch((error: Error) =>{
      done(error);
    });
  });

  const cleanUp = (cb) => Board.destroy({where: {}, truncate: true}).then(() => cb());

  beforeEach((done: Function) => {
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

  //주어진 객체를 CommentToComment모델에 저장하는 메서드
  const saveCommentToComment = (given, cb) => {
    const commentToComment = new CommentToComment(given);
    commentToComment.save()
      .then((saveCommentToComment: CommentToComment)=>{
        cb(saveCommentToComment);
      });
  };

  it('게시글 추가, 댓글 추가 후 대댓글을 추가한다.', (done: Function) => {
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};
    let givenCommentToComment = {content:'대댓글 내용1', writer:'대댓글 작성자1'};

    saveBoard(givenBoard,(givenBoard: Board) => {
      saveComment(givenComment,(givenComment: Comment) => {
        givenBoard.$add('Comment', givenComment);
        saveCommentToComment(givenCommentToComment,(givenCommentToComment: CommentToComment) => {
          givenComment.$add('CommentToComment', givenCommentToComment);
          Board.findOne<Board>({include:[Comment]}).then((board: Board)=>{
             Comment.findOne<Comment>({include:[CommentToComment]}).then((comment: Comment)=>{
                CommentToComment.findOne<CommentToComment>({where:{content:'대댓글 내용1', writer:'대댓글 작성자1'}}).then((commentToComment: CommentToComment)=>{

                Board.findOne<Board>({include:[Comment]}).then((board: Board)=>{
                  // expect(board.comments.commentToComments.length).to.be.equal(1);
                  expect(board.comments[0].commentToComments.length).to.be.equal(1);
                  // expect(commentToCommnet.writer).to.be.equal(givenCommentToComment.writer);
                });

                done();

              });
            });
          });
        });
      });
    });

  });


  it("게시글, 댓글, 대댓글 추가 후 대댓글 업데이트", (done: Function)=>{
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};
    let givenCommentToComment = {content:'대댓글 내용1', writer:'대댓글 작성자1'};
    let updateCommentToComment = {content:'변경된 대댓글 내용1', writer:'변경된 대댓글 작성자1'};

    saveBoard(givenBoard, (saveBoard: Board) => {
      saveComment(givenComment, (saveComment: Comment) => {
        saveBoard.$add('Comment', saveComment);
        saveCommentToComment(givenCommentToComment, (saveCommentToComment: CommentToComment) => {
          saveComment.$add('CommentToComment', saveCommentToComment);
          saveCommentToComment.update(updateCommentToComment,{where:{content:'대댓글 내용1', writer:'대댓글 작성자1'}}).then(()=>{
            Board.findOne<Board>({include:[Comment]}).then((board: Board) => {
              Comment.findOne<Comment>({include:[CommentToComment]}).then((comment: Comment)=>{
                expect(board.comments[0].content).to.be.equal(givenComment.content);
                expect(comment.commentToComments[0].content).to.be.equal(updateCommentToComment.content);
                //TODO:board부터 대댓글까지 한 번에 접근해서 테스트 코드를 한 줄로 만들 수는 없을까?
                // expect(board.comments[0].commentToComments.length).to.be.equal(1);
                done();
              });
            });
          });
        });
      });
    });
  });

  it.only("게시글, 댓글, 대댓글 추가 후 대댓글 삭제", (done: Function)=>{
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let givenComment = {content:'댓글 내용1', writer:'댓글 작성자1'};
    let givenCommentToComment = {content:'대댓글 내용1', writer:'대댓글 작성자1'};

    saveBoard(givenBoard, (saveBoard: Board)=>{
      saveComment(givenComment, (saveComment: Comment)=>{
        saveBoard.$add('Comment', saveComment);
        saveCommentToComment(givenCommentToComment, (saveCommentToComment: CommentToComment)=>{
          saveComment.$add('CommentToComment', saveCommentToComment);
          CommentToComment.destroy({where:{content:'대댓글 내용1', writer:'대댓글 작성자1'}}).then(()=>{
            CommentToComment.findOne<CommentToComment>({where:{content:'대댓글 내용1', writer:'대댓글 작성자1'}}).then((destroyedCommentToComment: CommentToComment)=>{
              expect(destroyedCommentToComment).to.be.equal(null);
              done();
            });
          });
        });
      });
    });

  });




});