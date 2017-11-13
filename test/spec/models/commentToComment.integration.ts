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

                expect(board.comments.length).to.be.equal(1);
                // expect(board.comments.commentToComments.length).to.be.equal(1);
                // expect(board.comments[0].commentToComments.length).to.be.equal(1);
                // expect(commentToCommnet.writer).to.be.equal(givenCommentToComment.writer);
                done();

              });
            });
          });
        });
      });
    });

  });


});