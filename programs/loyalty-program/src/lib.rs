use anchor_lang::prelude::*;
use anchor_spl::token::{self, MintTo, Token, TokenAccount, Mint};

declare_id!("Loyalty11111111111111111111111111111111111");

#[program]
pub mod loyalty_service {
    use super::*;

    // Initialize the loyalty program settings
    pub fn initialize(ctx: Context<Initialize>, decimals: u8) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.admin = *ctx.accounts.admin.key;
        state.mint = *ctx.accounts.points_mint.to_account_info().key;
        Ok(())
    }

    // Issue points to a user's wallet
    pub fn issue_points(ctx: Context<IssuePoints>, amount: u64) -> Result<()> {
        let cpi_accounts = MintTo {
            mint: ctx.accounts.points_mint.to_account_info(),
            to: ctx.accounts.user_token_account.to_account_info(),
            authority: ctx.accounts.admin.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::mint_to(cpi_ctx, amount)?;
        
        emit!(PointsIssued {
            user: *ctx.accounts.user_token_account.to_account_info().key,
            amount,
        });
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 32)]
    pub state: Account<'info, GlobalState>,
    pub points_mint: Account<'info, Mint>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct IssuePoints<'info> {
    #[account(mut)]
    pub points_mint: Account<'info, Mint>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    pub admin: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct GlobalState {
    pub admin: Pubkey,
    pub mint: Pubkey,
}

#[event]
pub struct PointsIssued {
    pub user: Pubkey,
    pub amount: u64,
}
