import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Modal, Button } from 'react-bootstrap';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


// PrimeReact CSS
import 'primereact/resources/themes/saga-blue/theme.css';  // Or any theme you like
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css'; // For icons



const DonutChartWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

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

  const chartData = {
    height: 270,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return `${val.toFixed(2)}%`;
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%'
          }
        }
      },
      labels: ['Communicated', 'Never Communicated', 'Not Communicated'],
      legend: {
        show: true
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 10,
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
    series: [85, 12, 8]
  };

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type={chartData.type} height={chartData.height} />

      {/* Modal for displaying clicked data */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Clicked Data</Modal.Title>
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