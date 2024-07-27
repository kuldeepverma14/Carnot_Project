import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { FireAuth } from '../Firebase/Firebase';
import { NavLink } from 'react-router-dom';
const auth = getFirestore(FireAuth);

function Dashboard() {
    const [data, setData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [monthlyDirectExpenses, setMonthlyDirectExpenses] = useState({});
    const [monthlyIndirectExpenses, setMonthlyIndirectExpenses] = useState({});
    const [monthlyProjectValues, setMonthlyProjectValues] = useState({});
    const [monthlyCombinedExpenses, setMonthlyCombinedExpenses] = useState({});
    const [monthlyProfitLoss, setMonthlyProfitLoss] = useState({});

    const getCollection = async () => {
        try {
            const collectionReference = collection(auth, "Carnot Project");
            const snap = await getDocs(collectionReference);
            const data = snap.docs.map(doc => ({ doc: doc.data(), id: doc.id }));
            const sortedData = sortDataByMonth(data);
            setData(sortedData);
            setMonthData(sortedData);
        } catch (er) {
            console.error("Error fetching collection:", er);
        }
    };

    useEffect(() => {
        getCollection();
    }, []);

    useEffect(() => {
        if (monthData.length === 0) return;

        const groupedDirectExpenses = groupAndSumByMonth(monthData, 'directExpense');
        const groupedIndirectExpenses = groupAndSumByMonth(monthData, 'indirectExpense');
        const groupedProjectValues = groupAndSumByMonth(monthData, 'projectValue');

        setMonthlyDirectExpenses(groupedDirectExpenses);
        setMonthlyIndirectExpenses(groupedIndirectExpenses);
        setMonthlyProjectValues(groupedProjectValues);
    }, [monthData]);

    useEffect(() => {
        const combinedExpenses = combineMonthlyExpenses(monthlyDirectExpenses, monthlyIndirectExpenses);
        setMonthlyCombinedExpenses(combinedExpenses);
    }, [monthlyDirectExpenses, monthlyIndirectExpenses]);

    useEffect(() => {
        const profitLoss = calculateMonthlyProfitLoss(monthlyProjectValues, monthlyCombinedExpenses);
        setMonthlyProfitLoss(profitLoss);
    }, [monthlyProjectValues, monthlyCombinedExpenses]);

    const handleSelectChange = (event) => {
        setSelectedProjectId(event.target.value);
    };

    const filteredData = selectedProjectId
        ? data.filter(item => item.id === selectedProjectId)
        : [data[0]];

    const projectName = filteredData[0]?.doc.projectName;
    const directExpense = filteredData[0]?.doc.directExpense;
    const inDirectExpense = filteredData[0]?.doc.indirectExpense;
    const projectValue = filteredData[0]?.doc.projectValue;

    const monthOrder = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    const sortDataByMonth = (data) => {
        return data.sort((a, b) => {
            const monthA = a?.doc?.month;
            const monthB = b?.doc?.month;
            return monthOrder[monthA] - monthOrder[monthB];
        });
    };

    const groupAndSumByMonth = (data, field) => {
        return data.reduce((acc, item) => {
            const month = item?.doc?.month;
            const value = parseInt(item?.doc[field], 10);

            if (month) {
                if (!acc[month]) {
                    acc[month] = 0;
                }
                acc[month] += value || 0;
            }
            return acc;
        }, {});
    };

    const combineMonthlyExpenses = (directExpenses, indirectExpenses) => {
        const combined = {};

        for (const month in directExpenses) {
            combined[month] = (directExpenses[month] || 0) + (indirectExpenses[month] || 0);
        }

        for (const month in indirectExpenses) {
            if (!combined[month]) {
                combined[month] = indirectExpenses[month];
            }
        }

        return combined;
    };

    const calculateMonthlyProfitLoss = (projectValues, combinedExpenses) => {
        const profitLoss = {};

        for (const month in projectValues) {
            profitLoss[month] = (projectValues[month] || 0) - (combinedExpenses[month] || 0);
        }

        // Include months with only combined expenses
        for (const month in combinedExpenses) {
            if (!profitLoss[month]) {
                profitLoss[month] = -(combinedExpenses[month] || 0);
            }
        }

        return profitLoss;
    };

    const optionPie = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Expenses',
                type: 'pie',
                radius: '95%',
                data: [
                    { value: directExpense, name: 'Direct Expense' },
                    { value: inDirectExpense, name: 'Indirect Expense' },
                    { value: projectValue, name: 'Project Value' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const projectTotalExpense = {
        xAxis: {
            type: 'category',
            data: Object.keys(monthlyCombinedExpenses)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Combined Expenses',
                data: Object.values(monthlyCombinedExpenses),
                type: 'bar',
                itemStyle: {
                    color: '#1890FF'
                }
            }
        ]
    };

    const projectTotalValue = {
        xAxis: {
            type: 'category',
            data: Object.keys(monthlyProjectValues)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Project Value',
                data: Object.values(monthlyProjectValues),
                type: 'bar',
                itemStyle: {
                    color: '#1890FF'
                }
            }
        ]
    };

    const profitLossChart = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Object.keys(monthlyProfitLoss)
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Profit/Loss',
                data: Object.values(monthlyProfitLoss),
                type: 'line',
                areaStyle: {},
                itemStyle: {
                    color: '#1890FF'
                }
            }
        ]
    };

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <nav className="flex-1 block lg:hidden ">
                <NavLink className="" to="/layout/dashboard" end style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
                    Dashboard &nbsp;  / &nbsp;
                </NavLink>
                <NavLink className="" to="/layout/create" style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
                    Create Project  &nbsp;  / &nbsp;
                </NavLink>
                <NavLink className="" to="/layout/projects" style={({ isActive }) => ({ color: isActive ? '#38C0E6' : 'black' })}>
                    Projects
                </NavLink>
            </nav>
            <div className='grid  lg:grid-cols-3 mt-5 lg:space-x-5'>
                <div className='lg:col-span-1  flex flex-col justify-center py-4 p-5 shadow-md rounded-lg bg-white lg:h-96'>
                    <select className="w-full p-2 border rounded bg-gray-50" onChange={handleSelectChange}>
                        <option value="">Select Project</option>
                        {data?.map((item, i) => {
                            const fields = item?.doc?.projectName;
                            const projectId = item?.id;
                            return (
                                <option key={i} value={projectId}>{fields}</option>
                            );
                        })}
                    </select>
                    <div className=' '>
                        <div> <h1 className='my-5 '><b>Project Name :</b>   {projectName}</h1>
                            <h1 className='my-5 text-[#FAC858]'><b>Project Value :</b> ₹ {projectValue}</h1>
                            <h1 className='my-5 text-[#5470C6]' ><b>Direct Expense :</b> ₹ {directExpense}</h1>
                            <h1 className='my-5 text-[#91CC75]'><b>Indirect Expense :</b> ₹ {inDirectExpense}</h1>
                        </div>
                        <div className=''>
                            <div className="flex justify-center items-center w-auto px-2 h-8 bg-[#FAC858] text-white text-center rounded-md">
                                Project Value
                            </div>

                            <div className="flex justify-center items-center w-auto mt-2  px-2 h-8 bg-[#5470C6] text-white text-center rounded-md">
                                Direct Expense
                            </div>

                            <div className="flex justify-center items-center w-auto mt-2  px-2 h-8 bg-[#91CC75] text-white text-center rounded-md">
                                Indirect Expense
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-5 lg:mt-0 h-40 sm:h-56 lg:h-96 lg:col-span-2 shadow-md rounded-lg bg-white py-4 lg:px-5  flex justify-center lg:justify-end items-center lg:items-end">
                    <ReactECharts
                        option={optionPie}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
            <div className='mt-5 bg-white shadow-md rounded-lg p-5'>
                <h1> Monthly Expenses (₹)</h1>
                <ReactECharts option={projectTotalExpense} />
            </div>
            <div className='mt-5 bg-white shadow-md rounded-lg p-5'>
                <h1> Monthly Project Value (₹)</h1>
                <ReactECharts option={projectTotalValue} />
            </div>
            <div className='mt-5 bg-white shadow-md rounded-lg p-5'>
                <h1> Monthly Profit/Loss (₹)</h1>
                <ReactECharts option={profitLossChart} />
            </div>

        </div>
    );
}

export default Dashboard;
