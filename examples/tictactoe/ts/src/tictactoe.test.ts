import { TicTacToe } from './tictactoe';
import {
  isReady,
  shutdown,
  Field,
  Bool,
  PrivateKey,
  PublicKey,
  Mina,
  AccountUpdate,
  Signature,
} from 'snarkyjs';

describe('tictactoe', () => {
  let player1: PublicKey,
    player1Key: PrivateKey,
    player2: PublicKey,
    player2Key: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey;

  beforeEach(async () => {
    await isReady;
    let Local = Mina.LocalBlockchain({ proofsEnabled: false });
    Mina.setActiveInstance(Local);
    [
      { publicKey: player1, privateKey: player1Key },
      { publicKey: player2, privateKey: player2Key },
    ] = Local.testAccounts;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
  });

  afterAll(() => {
    setTimeout(shutdown, 0);
  });

  it('generates and deploys tictactoe', async () => {
    const zkApp = new TicTacToe(zkAppAddress);
    const txn = await Mina.transaction(player1, () => {
      AccountUpdate.fundNewAccount(player1);
      zkApp.deploy();
      zkApp.startGame(player1, player2);
    });
    await txn.prove();
    await txn.sign([zkAppPrivateKey, player1Key]).send();
    const board = zkApp.board.get();
    expect(board).toEqual(Field(0));
  });

  it('deploys tictactoe & accepts a correct move', async () => {
    const zkApp = new TicTacToe(zkAppAddress);

    // deploy
    let txn = await Mina.transaction(player1, () => {
      AccountUpdate.fundNewAccount(player1);
      zkApp.deploy();
      zkApp.startGame(player1, player2);
    });
    await txn.prove();
    await txn.sign([zkAppPrivateKey]).send();

    // move
    const [x, y] = [Field(0), Field(0)];
    const signature = Signature.create(player1, [x, y]);
    txn = await Mina.transaction(player1, async () => {
      zkApp.play(player1, signature, x, y);
    });
    await txn.prove();
    await txn.send();

    const nextIsPlayer2 = zkApp.nextIsPlayer2.get();
    expect(nextIsPlayer2).toEqual(Bool(true));
  });
});
