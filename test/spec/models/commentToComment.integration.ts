import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Baord from "../../../src/models/domain/board";
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

  const cleanUp = (cb) => CommentToComment.destroy({where: {}, truncate: true}).then(() => cb());

  beforeEach((done: Function) => {
    cleanUp(()=>done());
  });

  const save = (given, cb) => {
    const commentToComment = new CommentToComment(given);
    commentToComment.save()
      .then((saveCommentToComment: CommentToComment)=>{
        cb(saveCommentToComment);
      });
  };

  // it('대댓글을 추가한다.', (done: Function) => {
  //
  // });


});