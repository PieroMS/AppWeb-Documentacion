import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import config from '../config/config';

interface ProgressData {
    progress_name: string;
    progress_color: string;
}

const ProjectDetailsDonutComponent: React.FC = () => {
    const [chartData, setChartData] = useState({
        series: [] as number[],
        labels: [] as string[],
        colors: [] as string[],
    });
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    const fetchChartData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${config.apiUrl}/dev/endpoint/listEndpoints/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Validate response data
            const progressData: ProgressData[] = Array.isArray(response.data.data) 
                ? response.data.data 
                : [];

            // Extra validation to prevent errors
            if (progressData.length === 0) {
                setChartData({
                    series: [],
                    labels: ['Sin Datos'],
                    colors: ['#808080'] // Gray color for no data
                });
                return;
            }

            // Safe data processing with fallback values
            const progressMap = progressData.reduce((acc, item) => {
                // Ensure item has required properties
                const progressName = item.progress_name || 'Sin Datos';
                const progressColor = item.progress_color || '#808080';

                if (!acc[progressName]) {
                    acc[progressName] = { 
                        count: 0, 
                        color: progressColor 
                    };
                }
                acc[progressName].count += 1;
                return acc;
            }, {} as Record<string, { count: number; color: string }>);

            // Calculate percentages with safety checks
            const total = progressData.length;
            const series = Object.values(progressMap).map(
                (value) => Number(((value.count / total) * 100).toFixed(2))
            );
            
            const labels = Object.keys(progressMap);
            const colors = Object.values(progressMap).map((value) => value.color);

            setChartData({
                series: series.length > 0 ? series : [100],
                labels: labels.length > 0 ? labels : ['Sin Datos'],
                colors: colors.length > 0 ? colors : ['#808080'],
            });
        } catch (err) {
            console.error('Error fetching chart data:', err);
            setError('No se pudieron cargar los datos');
            
            // Set default state in case of error
            setChartData({
                series: [100],
                labels: ['Sin Datos'],
                colors: ['#808080']
            });
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [id]);

    const options = {
        chart: {
            type: 'donut',
        },
        colors: chartData.colors,
        labels: chartData.labels,
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (val: number) => `${val.toFixed(2)}%`,
            }
        }
    };

    return (
        <div className="col-span-12 rounded-sm border border-[#c4c4c4] dark:border-[#1c2434] bg-white px-5 pt-7.5 pb-5 mt-12 shadow-default dark:bg-boxdark sm:px-7.5 xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h2 className="text-title-md2 pb-2 font-semibold text-black dark:text-white">
                        Reporte de Avance
                    </h2>
                </div>
            </div>
            
            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center w-full h-80">
                    <ReactApexChart 
                        options={options} 
                        series={chartData.series} 
                        type="donut" 
                        height="100%"
                        width="100%"
                    />
                </div>
            </div>

            {chartData.labels.length > 0 && (
                <div className="flex flex-col items-center justify-center gap-y-3">
                    {chartData.labels.map((label, index) => (
                        <div key={label} className="w-full max-w-md px-8">
                            <div className="flex items-center">
                                <span 
                                    className="mr-2 block h-3 w-3 rounded-full" 
                                    style={{ backgroundColor: chartData.colors[index] }}
                                ></span>
                                <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                    <span>{label}</span>
                                    <span>{chartData.series[index]?.toFixed(2) || 0}%</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        
    );
};

export default ProjectDetailsDonutComponent;