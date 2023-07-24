'use client' //tells nextjs this is a client component

import React from "react";

type Props = {};

export default function LogoutButton({}: Props) {
  return (
    <button 
    onClick={() => console.log('learning a lot about nextjs, tailwindcss, ts, react...')}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign Out
    </button>
  );
}
