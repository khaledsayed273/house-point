import React from 'react'

function DropDownPhoneForm() {
    return (
        <div
            id="dropdown-phone"
            className="z-10  absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 "
        >
            <ul
                className="py-2  top-5 text-sm text-gray-700 "
                aria-labelledby="dropdown-phone-button"
            >
                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                        role="menuitem"
                    >
                        <span className="inline-flex items-center">
                            <svg
                                fill="none"
                                aria-hidden="true"
                                className="h-4 w-4 mr-2"
                                viewBox="0 0 20 15"
                            >
                                {/* SVG content here */}
                            </svg>
                            United States (+1)
                        </span>
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                        role="menuitem"
                    >
                        <span className="inline-flex items-center">
                            <svg
                                fill="none"
                                aria-hidden="true"
                                className="h-4 w-4 mr-2"
                                viewBox="0 0 20 15"
                            >
                                {/* SVG content here */}
                            </svg>
                            United States (+1)
                        </span>
                    </button>
                </li>

                {/* Add more list items as needed */}
            </ul>
        </div>
    )
}

export default DropDownPhoneForm
