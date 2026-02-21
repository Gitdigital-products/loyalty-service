// src/components/admin/FraudWatchlist.tsx
import React from 'react';

const FraudWatchlist = ({ flaggedUsers, onFreezeWallet }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-red-100">
      <table className="min-w-full bg-white">
        <thead className="bg-red-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-red-700 uppercase">Wallet Address</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-red-700 uppercase">Risk Score</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-red-700 uppercase">Reason</th>
            <th className="px-6 py-3 text-right text-xs font-bold text-red-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {flaggedUsers.map((user) => (
            <tr key={user.wallet} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono text-sm">{user.wallet.slice(0, 8)}...</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                  {user.riskScore}/100
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{user.flagReason}</td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onFreezeWallet(user.wallet)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                >
                  Freeze Wallet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
