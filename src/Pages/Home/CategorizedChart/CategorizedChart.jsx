import useProducts from "../../../Hooks/useProducts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './CategorizedChart.css';

const CategorizedChart = () => {
    const [products] = useProducts();

    const categoryCounts = products.reduce((acc, product) => {
        const { category } = product;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category]++;
        return acc;
    }, {});

    const capitalizeWords = (str) => {
        return str.replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    const resultArray = Object.keys(categoryCounts).map(category => ({
        category: capitalizeWords(category),
        numberOfProducts: categoryCounts[category]
    }));

    return (
        <div className="bg-white">
            <div>
                <h1 className="px-6 py-3 font-bold">Categorized Products</h1>
                <hr className='text-center border border-gray-500 mb-5' />
            </div>
            <div className="w-full">
                <div className="w-full flex justify-center items-center overflow-x-auto">
                    <BarChart
                        width={1100}
                        height={400}
                        data={resultArray}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="category"
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="numberOfProducts"
                            fill="#3B82F6"
                            name="Total Products"
                        />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default CategorizedChart;