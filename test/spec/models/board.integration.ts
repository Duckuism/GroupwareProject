import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Board from "../../../src/models/domain/board";
import Comment from "../../../src/models/domain/comment";

describe("[integration] 게시판 모델을 테스트 중입니다.",function(){

  before((done:Function) => {
    sequelize.sync().then(() => {
      done();
    }).catch((error: Error) => {
      done(error);
    });
  });

  const cleanUp2 = (cb) => Board.destroy({where: {}, truncate: true}).then(() => cb());

  beforeEach((done: Function)=>{
    cleanUp2(()=>done());
  });

  const save = (given, cb) => {
    const board = new Board(given);
    board.save()
      .then((saveBoard: Board) => {
        cb(saveBoard);
      });
  };

  it('게시글을 추가한다', function(done){
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};

    save(givenBoard, (saveBoard: Board) => {
      expect(saveBoard.title).to.be.eql(givenBoard.title);
      expect(saveBoard.content).to.be.eql(givenBoard.content);
      expect(saveBoard.writer).to.be.eql(givenBoard.writer);
      done();
    });
  });

});