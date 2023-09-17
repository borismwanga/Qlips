//404 component for wrong url
// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function NotFound() {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
            <h1 className="text-6xl">404</h1>
            <h2 className="text-2xl">Page Not Found</h2>
        </div>
    </div>
    )
}