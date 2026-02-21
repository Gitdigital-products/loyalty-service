#[account]
pub struct GlobalState {
    pub admin: Pubkey,
    pub is_paused: bool,      // Circuit breaker
    pub daily_mint_cap: u64,  // Limit total points per day
}

// Inside your issue_points function:
pub fn issue_points(ctx: Context<IssuePoints>, amount: u64) -> Result<()> {
    let state = &ctx.accounts.state;
    
    // 1. Check if program is paused
    require!(!state.is_paused, LoyaltyError::ProgramPaused);
    
    // 2. Check Admin Signature
    require_keys_eq!(ctx.accounts.admin.key(), state.admin, LoyaltyError::Unauthorized);

    // ... mint logic ...
    Ok(())
}
