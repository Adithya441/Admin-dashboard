import React, { useContext, useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Modal, Button } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


// PrimeReact CSS
import 'primereact/resources/themes/saga-blue/theme.css';  // Or any theme you like
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; // For icons
import { useUser } from 'contexts/context';
import { exportDataToCSV } from 'Download/Csv';
import { exportDataToExcel } from 'Download/Excel';



const DonutChartWithModal = () => {
    const {option} = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [label, setLabel] = useState([]);
    const [serie, setSerie] = useState([]);
    const [selectedoption, setSelectedoption] = useState('');

    useEffect(()=>{
        if(option === 'all'){
            setLabel(['Communicated', 'Never Communicated', 'Not Communicated']);
            setSerie([85, 12, 8]);
        }
        else if(option === 'comu'){
            setLabel(['Communicated']);
            setSerie([85]);
        }
        else if(option === 'notcomu'){
            setLabel(['Not Communicated']);
            setSerie([8]);
        }
        else if(option === 'nevercomu'){
            setLabel(['Never Communicated']);
            setSerie([12]);
        }
    },[option]);

  const handleDataClick = (dataIndex) => {
    const labels = ['Communicated', 'Never Communicated', 'Not Communicated'];
    const series = [85, 12, 8];
    const clickedLabel = labels[dataIndex];
    const clickedValue = series[dataIndex];

    setSelectedData([{
      label: clickedLabel,
      value: clickedValue
    }]);
    

    setIsModalOpen(true);
  };
  const handleschange = (e) => {
    const value = e.target.value;
    handleexport(value);
    setSelectedoption(value);
    setTimeout(() => {
      setSelectedoption('');
    }, 1000);
  };

  const handleexport = (format) => {
    const title = selectedData[0].label;
    switch (format) {
      case 'pdf':
        convert();
        break;
      case 'csv':
        exportDataToCSV(selectedData,title);
        break;
      case 'excel':
        exportDataToExcel(selectedData,title);
        break;
      default:
        break;
    }
  };

  const chartData = {
    height: 270,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            // Access the value from the series for the current data point
            const actualValue = opts.w.config.series[opts.seriesIndex];
            return actualValue;  // Display the actual value
          }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%'
          }
        }
      },
      labels: label,
      legend: {
        show: true
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      colors: ['#FF6384', '#36A2EB', '#FFCE56'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0
      },
      chart: {
        events: {
          dataPointSelection: (event, chartContext, { dataPointIndex }) => {
            handleDataClick(dataPointIndex);
          }
        }
      }
    },
    series: serie
  };

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />

      {/* Modal for displaying clicked data */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered size='xl' style={{width:'900px', marginLeft:'280px'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{marginRight:'350px'}}> Meters</Modal.Title>
          <select style={{ width: '70px', height: '30px', fontSize: '12px' }} onChange={handleschange} value={selectedoption}>
                <option value='All'>Export</option>
                <option value='pdf'>PDF</option>
                <option value='csv'>CSV</option>
                <option value='excel'>EXCEL</option>
              </select>
        </Modal.Header>
        <Modal.Body>
          {selectedData && (
            <DataTable value={selectedData} sortMode="multiple">
                <Column field='label' header='Status' sortable></Column>
                <Column field='value' header='Count' sortable></Column>
            </DataTable>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonutChartWithModal;