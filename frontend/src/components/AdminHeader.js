import { Link } from 'react-router-dom';

export default function AdminHeader({pageTitle, actionLabel, actionLink, backLabel, backLink}) {
    return (
        <header className="shadow h-16 bg-white p-3 mb-4 flex justify-between items-center bg-slate-300">
            <h3 className="text-lg font-[500] font-lightblack">{pageTitle}</h3>
            <div className="flex gap-[5px]">
                {
                    backLabel ? (
                        <Link
                        to={backLink}
                        className="inline-block bg-indigo-600 text-white hover:bg-indigo-700 font-medium rounded-lg text-xs px-4 py-2"
                        >
                            {backLabel}
                        </Link>
                    )
                    : ''
                }
                {
                    actionLabel ? (
                        <Link
                        to={actionLink}
                        className="inline-block bg-green-600 text-white hover:bg-green-700 font-medium rounded-lg text-xs px-4 py-2"
                        >
                            {actionLabel}
                        </Link>
                    )
                    : ''
                }
            </div>
        </header>
         
    );
  }
  