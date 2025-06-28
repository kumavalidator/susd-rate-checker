import { PublicKey, Connection, TransactionError, VersionedTransaction, TransactionMessage, SimulateTransactionConfig } from "@solana/web3.js";
import { createUiAmountToAmountInstruction, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { u64 } from '@solana/buffer-layout-utils';

export async function uiAmountToAmount(
    connection: Connection,
    mint: PublicKey,
    amount: string,
    programId = TOKEN_PROGRAM_ID,
): Promise<bigint | TransactionError | null> {
    const config: SimulateTransactionConfig = {
      replaceRecentBlockhash: true,
      sigVerify: false,
    };

    const messaageV0 = new TransactionMessage({
      // no sig verification (any account with 0.001 SOL balance should work)
      payerKey: new PublicKey("burncPhAzPbo9QCzN9j8ig2FKZjwDhM5zgN2eW3GmWa"),
      // dummy (will be replaced by the RPC)
      recentBlockhash: "CDHkGCmgp6YfWQCwpD4mGe6eYpHCz7YEwjbiUCvbeZt4",
      instructions:[createUiAmountToAmountInstruction(mint, amount, programId)]
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messaageV0);
    
    const { returnData, err } = (await connection.simulateTransaction(transaction, config)).value;
    if (returnData) {
        const data = Buffer.from(returnData.data[0], returnData.data[1]);
        return u64().decode(data);
    }
    return err;
}

async function main() {
  const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
  const SUSD = new PublicKey("susdabGDNbhrnCa6ncrYo81u4s9GM8ecK2UwMyZiq4X");

  const amount = await uiAmountToAmount(
    connection,
    SUSD,
    "1",
    TOKEN_2022_PROGRAM_ID,
  );

  if (typeof amount === "bigint") {
    const rate = 1_000_000 / Number(amount);
    console.log("rate: ", rate);
  } else {
    console.error(amount);
  }
}

main();