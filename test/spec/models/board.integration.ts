import {expect} from "chai";
import {sequelize} from "../../../src/models/index";
import Employee from "../../../src/models/domain/employee";
import Board from "../../../src/models/domain/board";
import {where} from "sequelize";


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

  it('게시글을 조회한다', function(done){
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};

    save(givenBoard, (saveBoard: Board)=>{
      Board.findOne<Board>({where:{title: '글 제목1'}})
        .then((board: Board) => {
          expect(board.title).to.be.equal(givenBoard.title);
          done();
        });
    });
  });

  it('게시글을 변경한다.', function(done){
    let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
    let updateBoard = {title:'변경된 글 제목1', content:'변경된 글 내용1', writer:'변경된 글 작성자1'};

    save(givenBoard, (saveBoard: Board)=>{
      saveBoard.update({title:'변경된 글 제목1', content:'변경된 글 내용1', writer:'변경된 글 작성자1'}, {where:{title:'글 제목1'}})
        .then((board: Board) => {
          expect(board.title).to.be.equal(updateBoard.title);
          expect(board.content).to.be.equal(updateBoard.content);
          done();
      });
    });
  });

  // it('게시글을 삭제한다.',function(done){
  //   let givenBoard = {title:'글 제목1', content:'글 내용1', writer:'글 작성자1'};
  //
  //   save(givenBoard, (saveBoard: Board) =>{
  //       saveBoard.destroy({where:{title:'글 제목1'}})
  //       .then((board: Board) => {
  //           expect(board.title).to.be.equal(undefined);
  //           done();
  //         });
  //     });
  //   });
  it('제목에 맞는 게싯글을 삭제', (done: Function) => {
    // given
    let givenBoard = {title: '글 제목1', content: '글 내용1', writer:'글 작성자1'};
    // when
    save(givenBoard, (saveBoard: Board) => {
      // then
      //일단 Board 모델에서 조건에 맞는 row를 찾고 익명함수 실행
      Board.destroy({where:{title:'글 제목1'}}).then(()=> {
        //다시 Board 모델에서 destroy한 객체와 같은 조건으로 객체를 찾아서 null이랑 비교.
        Board.findOne<Board>({where:{title:'게시글 제목'}}).then((findedBoard:Board)=>{
          expect(findedBoard).to.be.eql(null);
          done();
        });
      });
    });
  });
});