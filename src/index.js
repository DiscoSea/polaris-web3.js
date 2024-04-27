import { PublicKey, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const POLARIS_CONFIG_PDA = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");
const POLARIS_FEE_SOL = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");
const POLARIS_FEE_ATLAS = new PublicKey("FgWVFPpFQpAk1NkXn6X7q9rUtk8sfq3nEbxE9THt2nmD");
const programId = new PublicKey('9NVKKHGxkMQPDpemz6ZTdRrM9P4dxaKGRcjgTBncVDRm');

const Instructions = {
    BuyInstruction: 1
};



export function greet() {
  console.log("Hello from @polaris-fuel/web3.js");
}


export function createBuyInstruction(
  feePayer ,
  marketPDA ,
  userAtlasAccount,
  pdaAtlasAccount ,
  marketOwnerPubkey,
  resourceMint,
  userResourceAccount,
  pdaAmmoAccount,
  beneficiaryAtlasAccount,
  multiplier
)
{

  let ixBuffer2 = Buffer.alloc(1); 
  ixBuffer2.writeUInt8(Instructions.BuyInstruction, 0);

  let ammountBuffer = Buffer.alloc(1); 
  ammountBuffer.writeUInt8(multiplier, 0); 
  
  // Combine all parts into one instruction data buffer
  const instructionData2 = Buffer.concat([
      ixBuffer2,ammountBuffer
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
          { pubkey: POLARIS_FEE_ATLAS, isSigner: false, isWritable: true }, //fee star atlas account
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: beneficiaryAtlasAccount, isSigner: false, isWritable: true }, //beneficiary atlas account
          { pubkey: POLARIS_CONFIG_PDA, isSigner: false, isWritable: false },
          { pubkey: POLARIS_FEE_SOL, isSigner: false, isWritable: true } //fee sol account
      ],
      programId: programId,
      data: instructionData2
  });

  return instruction2
}




