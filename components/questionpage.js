import React, { useState } from 'react';

const QuizComponent = () => {
    // If you need to handle state for the checkboxes, you can use useState hooks here.
    // For demonstration purposes, we'll assume each checkbox doesn't need to be controlled.

    return (
        <div className="bg-blue-200 h-screen flex justify-center items-center">
            <div className="bg-blue-700 text-white p-10 rounded-lg max-w-md w-full">
                <div className="mb-6">
                    <p className="text-lg">Which of the following is the best online quiz maker?</p>
                    <div className="text-right text-xs">5/6</div>
                </div>
                <form className="space-y-4">
                    <label className="flex items-center p-3 bg-white rounded shadow cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
                        Rapid Refresh by EdApp
                    </label>
                    <label className="flex items-center p-3 bg-white rounded shadow cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
                        Survey Monkey
                    </label>
                    <label className="flex items-center p-3 bg-white rounded shadow cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
                        Kahoot!
                    </label>
                    <label className="flex items-center p-3 bg-white rounded shadow cursor-pointer">
                        <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
                        None of the above
                    </label>
                    <div className="mt-6 text-sm font-semibold">
                        SELECT ALL CORRECT ANSWERS
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizComponent;
