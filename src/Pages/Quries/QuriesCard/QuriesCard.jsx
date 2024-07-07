import { useState } from 'react';
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuriesCard = ({ query }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return {
                truncated: words.slice(0, wordLimit).join(' '),
                remaining: words.slice(wordLimit).join(' '),
                isTruncated: true,
            };
        }
        return {
            truncated: description,
            remaining: '',
            isTruncated: false,
        };
    };

    const { truncated, remaining, isTruncated } = truncateDescription(query.message, 30);

    return (
        <tr>
            <td>
                {query.name}
            </td>
            <td>
                {query.email}
            </td>
            <td>
                <div className="text-sm text-justify">
                    {isExpanded ? `${truncated} ${remaining}` : truncated}
                    {isTruncated && (
                        <button
                            className="text-blue-500 ml-2"
                            onClick={toggleDescription}>
                            {isExpanded ? '...Show Less' : 'Show More...'}
                        </button>
                    )}
                </div>
            </td>
            <th>
                <div className="flex justify-center items-center space-x-4 text-md">
                    <Link to={`/query/${query._id}`}>
                        <button className="p-2 rounded-[5px] hover:bg-green-100 focus:outline-none">
                            <FaEye className="text-green-500" />
                        </button>
                    </Link>
                    <button className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none">
                        <FaTrashAlt className="text-red-500" />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default QuriesCard;