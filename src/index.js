import { PublicKey, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const POLARIS_CONFIG_PDA = new PublicKey("9Qn1FLErYHPZiRusHdGvQDgVJeR82VrEXbYf33fHAvmB");

const Instructions = {
    BuyInstruction: 1,
    SellInstruction:2
};



export function greet() {
  console.log("Hello from @polaris-fuel/web3.js");
}


export function createBuyInstruction(
  programId,
  feePayer ,
  marketPDA ,
  userAtlasAccount,
  pdaAtlasAccount ,
  marketOwnerPubkey,
  resourceMint,
  userResourceAccount,
  pdaAmmoAccount,
  beneficiaryAtlasAccount,
  POLARIS_FEE_ATLAS,
  POLARIS_FEE_SOL,
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




export function createSellInstruction(
  programId,
  feePayer ,
  marketPDA ,
  userAtlasAccount,
  pdaAtlasAccount ,
  marketOwnerPubkey,
  resourceMint,
  userResourceAccount,
  pdaResourceAccount,
  beneficiaryResourceAccount,
  POLARIS_FEE_ATLAS,
  POLARIS_FEE_SOL,
  configPDA,
  rewardMint,
  rewardMintAccount,
  rewardMintAuthPDA,
  multiplier
)
{

  let ixBuffer2 = Buffer.alloc(1); 
  ixBuffer2.writeUInt8(Instructions.SellInstruction, 0);

  let multiplierBuffer = Buffer.alloc(1); 
  multiplierBuffer.writeUInt8(multiplier, 0); 
    
  // Combine all parts into one instruction data buffer
  const instructionData3 = Buffer.concat([
    ixBuffer2,multiplierBuffer
  ]);
  
  // derive the pda address for the Metadata account
  const rewardMintAuthPDA = PublicKey.findProgramAddressSync(
      [rewardMint.toBuffer()],
      programId,
  )[0];
  

  // Create the instruction
  const instruction3 = new TransactionInstruction({
      keys: [
          { pubkey: feePayer, isSigner: true, isWritable: true },
          { pubkey: marketPDA, isSigner: false, isWritable: false }, //pda vault
          { pubkey: userAtlasAccount, isSigner: false, isWritable: true }, //user atlas account
          { pubkey: pdaAtlasAccount, isSigner: false, isWritable: true }, //pda atlas account
          { pubkey: marketOwnerPubkey, isSigner: false, isWritable: true }, //market owner
          { pubkey: resourceMint, isSigner: false, isWritable: true }, //seed mint
          { pubkey: userResourceAccount, isSigner: false, isWritable: true }, //user ammo account
          { pubkey: pdaResourceAccount, isSigner: false, isWritable: true }, //pda ammo account
          { pubkey: POLARIS_FEE_ATLAS, isSigner: false, isWritable: true }, //fee star atlas account
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: beneficiaryResourceAccount, isSigner: false, isWritable: true }, //beneficiary resource account
          { pubkey: configPDA, isSigner: false, isWritable: false }, //config pda
          { pubkey: POLARIS_FEE_SOL,isSigner: false, isWritable: true }, //fee sol account
          { pubkey: rewardMint,isSigner: false, isWritable: true }, //fee sol account
          { pubkey: rewardMintAccount,isSigner: false, isWritable: true }, //fee sol account
          { pubkey: rewardMintAuthPDA,isSigner: false, isWritable: false } //fee sol account

      ],
      programId: programId,
      data: instructionData3
  });


  return instruction3

}













