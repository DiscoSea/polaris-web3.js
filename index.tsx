import { PublicKey, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID} from '@solana/spl-token';

const CONFIG_PDA = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");
const POLARIS_SOL = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");
const POLARIS_ATLAS = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");

export const programId = new PublicKey('9NVKKHGxkMQPDpemz6ZTdRrM9P4dxaKGRcjgTBncVDRm');

module.exports = {
    greet: function() {
      console.log("Hello from @polaris-fuel/web3.js");
    },


    createBuyInstruction:function(feePayer :PublicKey,
      marketPDA :PublicKey,
      userAtlasAccount:PublicKey,
      pdaAtlasAccount :PublicKey,
      marketOwnerPubkey:PublicKey,
      resourceMint:PublicKey,
      userResourceAccount:PublicKey,
      pdaAmmoAccount:PublicKey,
      beneficiaryAtlasAccount:PublicKey
    )
    {
        //user is buying resource 
      let ix2 = 1; // Example command or identifier
      let ixBuffer2 = Buffer.alloc(1); // Allocate a buffer for 1 byte
      ixBuffer2.writeUInt8(ix2, 0); // Write the value of ix at index 0
      
      // Combine all parts into one instruction data buffer
      const instructionData2 = Buffer.concat([
          ixBuffer2
      ]);
      
      const instruction2 = new TransactionInstruction({
          keys: [
              { pubkey: feePayer, isSigner: true, isWritable: true },
              { pubkey: marketPDA, isSigner: false, isWritable: false },
              { pubkey: userAtlasAccount, isSigner: false, isWritable: true },
              { pubkey: pdaAtlasAccount, isSigner: false, isWritable: true },
              { pubkey: marketOwnerPubkey, isSigner: false, isWritable: true },
              { pubkey: resourceMint, isSigner: false, isWritable: true },
              { pubkey: userResourceAccount, isSigner: false, isWritable: true },
              { pubkey: pdaAmmoAccount, isSigner: false, isWritable: true },
              { pubkey: POLARIS_ATLAS, isSigner: false, isWritable: true }, //fee star atlas account
              { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
              { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
              { pubkey: beneficiaryAtlasAccount, isSigner: false, isWritable: true }, //beneficiary atlas account
              { pubkey: CONFIG_PDA, isSigner: false, isWritable: false },
              { pubkey: POLARIS_SOL, isSigner: false, isWritable: true } //fee sol account
          ],
          programId: programId,
          data: instructionData2
      });

      return instruction2
    }


};
  