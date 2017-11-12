import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Board from "../../../src/models/domain/board";
import Comment from "../../../src/models/domain/comment";


describe("[integration] 댓글 모델을 테스트 중입니다.",function(){

  //비동기를 위해 sync를 맞추는 promise구조 hook작업이군
  before((done:Function) => {
    sequelize.sync().then(() => {
      //싱크가 잘맞으면 성공이고,
      done();
    }).catch((error: Error) => {
      //싱크가 안맞으면 에러를 뿜습니다.
      done(error);
    });
  });

  // 그럼 테스트를 시작하기 전에 깨끗하게 모든 걸 지워 보실까? truncate : table로우를 다 조져서 지우는 데이터 무결성 파괴의 주범.
  const cleanUp = (cb) => Comment.destroy({where: {}, truncate: true}).then(() => cb());

  //모든 테스트를 시작하기 전에 초기화
  beforeEach((done: Function)=>{
    cleanUp(()=>done());
  });

  //주어진 객체를 저장하는 메서드
  const save = (given, cb) => {
    const comment = new Comment(given);
    comment.save()
      .then((saveComment: Comment) => {
        cb(saveComment);
      });
  };

  it('댓글을 추가한다', function(done){
    let givenComment = { content:'글 내용1', writer:'글 작성자1'};

    save(givenComment, (saveComment: Comment) => {
      expect(saveComment.content).to.be.eql(givenComment.content);
      expect(saveComment.writer).to.be.eql(givenComment.writer);
      done();
    });
  });

  it('댓글을 조회한다', function(done){
    let givenComment = { content:'글 내용1', writer:'글 작성자1'};

    save(givenComment, (saveComment: Comment)=>{
      Comment.findOne<Comment>({where:{writer:'글 작성자1'}})
        .then((board: Comment) => {
          expect(board.writer).to.be.equal(givenComment.writer);
          done();
        });
    });
  });

  it('댓글을 변경한다.', function(done){
    let givenComment = {content:'글 내용1', writer:'글 작성자1'};
    let updateComment = {content:'변경된 글 내용1', writer:'변경된 글 작성자1'};

    save(givenComment, (saveComment: Comment)=>{
      Comment.update({content:'변경된 글 내용1', writer:'변경된 글 작성자1'},{where:{writer:'글 작성자1'}}).then(()=>{
        //findOne으로 찾은 Comment 모델 안의 객체를 comment라는 변수에 저장해서 함수의 파라미터로 넘긴다. 이걸 이해하기 힘들었네.
        Comment.findOne<Comment>({where: {writer:'변경된 글 작성자1'}})
          .then((comment: Comment) => {
            //댓글은 내용과 작성자만 만들어놨으므로 title 해놓으면 에러난다.
            expect(comment.content).to.be.equal(updateComment.content);
            expect(comment.writer).to.be.equal(updateComment.writer);
            done();
          });
      });
    });
  });

  it.only('댓글을 삭제한다.',function(done){
    let givenComment = {content:'글 내용1', writer:'글 작성자1'};

    save(givenComment, (saveComment: Comment) =>{
      Comment.destroy({where:{writer:'글 작성자1'}}).then(()=>{
        Comment.findOne<Comment>({where:{content:'글 내용1', writer:'글 작성자1'}}).then((comment: Comment)=>{
          expect(comment).to.be.equal(null);
          done();
        });
      });



    });
  });

});