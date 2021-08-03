import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import femalekuva from './image/female.png';
import malekuva from './image/male.png';
import nonbinarykuva from './image/nonbinary.png';
// Ikonit
import { FaSyringe } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaHospital } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function App() {

  // Antiqua data
  const [AntiquaData, setAntiquaData] = React.useState([]);
  const getAntiquaData = () => {
    fetch('resources/Antiqua.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setAntiquaData(myJson)
      });
  }
  React.useEffect(() => { getAntiquaData() },[])

  // SolarBuddhica data
  const [SolarBuddhicaData, setSolarBuddhicaData] = React.useState([]);
  const getSolarBuddhicaData = () => {
    fetch('resources/SolarBuddhica.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setSolarBuddhicaData(myJson)
      });
  }
  React.useEffect(() => { getSolarBuddhicaData() },[])

  // Zerpfy data
  const [ZerpfyData, setZerpfyData] = React.useState([]);
  const getZerpfyData = () => {
    fetch('resources/Zerpfy.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setZerpfyData(myJson)
      });
  }
  React.useEffect(() => { getZerpfyData() },[])

  // Vaccinations data
  const [VaccinationData, setVaccinationData] = React.useState([]);
  const getVaccinationData = () => {
    fetch('resources/vaccinations.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setVaccinationData(myJson)
      });
  }
  React.useEffect(() => { getVaccinationData() },[])

  // Muuntajat
  const [searchMonth, setMonth] = React.useState('01')
  const [searchPaiva, setPaiva] = React.useState('01')
  const [hakuorders, setHakuorders] = React.useState('0')
  const [hakuvaccines, setHakuvaccines] = React.useState('0')
  const tilausMaara = AntiquaData.length + SolarBuddhicaData.length + ZerpfyData.length

  // Funktiot
  const naytaPaiva = function(e) {
    e.preventDefault() // sivu ei refresh submitin jälkeen
    let hakupaiva = searchMonth + '-' + searchPaiva // hakustring esim. 03-14
    let tilaukset = 0
    let injektiot = 0

    // Antiqua-loop
    for (let i = 0; i < AntiquaData.length; i++) {
      const element1 = AntiquaData[i].arrived.slice(5, 10); // match hakustring
      if (hakupaiva === element1) {
        tilaukset++
        injektiot += AntiquaData[i].injections
      }   
    }
    // SolarBuddhica-loop
    for (let i = 0; i < SolarBuddhicaData.length; i++) {
      const element2 = SolarBuddhicaData[i].arrived.slice(5, 10); // match hakustring
      if (hakupaiva === element2) {
        tilaukset++
        injektiot += SolarBuddhicaData[i].injections
      }   
    }
    // Zerpfy-loop
    for (let i = 0; i < ZerpfyData.length; i++) {
      const element3 = ZerpfyData[i].arrived.slice(5, 10); // match hakustring
      if (hakupaiva === element3) {
        tilaukset++
        injektiot += ZerpfyData[i].injections
      }   
    }
    setHakuorders(tilaukset)
    setHakuvaccines(injektiot)
  }

  // Ohjelma Return //
  return (
    
    <div className="App">

      <div id="header">
        <h1><FaUserAlt fontSize="1.4em"/> People vaccinated {VaccinationData.length}</h1>
        <h1><FaHospital fontSize="1.4em"/> Order amount {tilausMaara}</h1>
      </div>

      <div id="ekarivi">
        <Producer lista1={AntiquaData} lista2={SolarBuddhicaData} lista3={ZerpfyData} />
      </div>

      <div id="tokarivi">
      <Sukupuoli lista={VaccinationData} />

        <div id="naytapaiva">
          <h2>Show data by date</h2>
          <form onSubmit={naytaPaiva}>
            <span>Month</span>
            <select onChange={(e) => { setMonth(e.target.value); } }>
              <option value="01">Tammikuu</option>
              <option value="02">Helmikuu</option>
              <option value="03">Maaliskuu</option>
              <option value="04">Huhtikuu</option>
            </select>

            <span>Day</span>
            <select onChange={(e) => { setPaiva(e.target.value); } }>
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <br/>
            <button type="submit" className="nappula"><FaSearch /> Search </button>
          </form> 
          
          <h4>ORDERS {hakuorders}</h4>

          <h4>VACCINES {hakuvaccines}</h4>

        </div>
      </div>
    <footer>
      <h1>Design by Jere Länsipii
        <a href="https://github.com/ojela028xamk"><FaGithub fontSize="1.2em"/></a>
      </h1>
    </footer>
    </div>

  );
  
}

const Sukupuoli = props => {

  let miehet = 0
  let naiset = 0
  let nonbinary = 0

  // laske gender määrä
  for (let item of props.lista) {
    if (item.gender === "female") {
      naiset++
    }
    if (item.gender === "male") {
      miehet++
    }
    if (item.gender === "nonbinary") {
      nonbinary++
    }
  }

  return (
    <div id="sukupuoli">
      <h2>Vaccine receivers by gender</h2>
      <div id="genderkuvat">
        <div className="genderkuva">
          <img src={femalekuva} alt="female" width="100px" height="100px" />
          <br/>
          <span><b>Women</b></span>
          <br/> 
          <span>{naiset}</span>
        </div>

        <div className="genderkuva">
          <img src={malekuva} alt="male" width="100px" height="100px" />
          <br/>
          <span><b>Men</b></span>
          <br/> 
          <span>{miehet}</span>
        </div>

        <div className="genderkuva">
          <img src={nonbinarykuva} alt="nonbinary" width="100px" height="100px" />
          <br/>
          <span><b>Nonbinary</b></span>
          <br/> 
          <span>{nonbinary}</span>
        </div>
        
      </div>
    </div>
  )

};

const Producer = props => {

  let AntVaccines = 0
  let SolVaccines = 0
  let ZerVaccines = 0


  // Rokotuksien määrä tuottajan mukaan
  for (let i = 0; i < props.lista1.length; i++) {
    AntVaccines += props.lista1[i].injections
  }
  for (let i = 0; i < props.lista2.length; i++) {
    SolVaccines += props.lista2[i].injections
  }
  for (let i = 0; i < props.lista3.length; i++) {
    ZerVaccines += props.lista3[i].injections
  }

  // Sairaalan mukaan
  let hyks = 0, oys = 0, kys = 0, tays = 0, tyks = 0

  for (let i = 0; i < props.lista1.length; i++) {
    if (props.lista1[i].healthCareDistrict === "HYKS") { hyks++ }
    if (props.lista1[i].healthCareDistrict === "OYS") { oys++ }
    if (props.lista1[i].healthCareDistrict === "KYS") { kys++ }
    if (props.lista1[i].healthCareDistrict === "TAYS") { tays++ }
    if (props.lista1[i].healthCareDistrict === "TYKS") { tyks++ }
  }
  for (let i = 0; i < props.lista2.length; i++) {
    if (props.lista2[i].healthCareDistrict === "HYKS") { hyks++ }
    if (props.lista2[i].healthCareDistrict === "OYS") { oys++ }
    if (props.lista2[i].healthCareDistrict === "KYS") { kys++ }
    if (props.lista2[i].healthCareDistrict === "TAYS") { tays++ }
    if (props.lista2[i].healthCareDistrict === "TYKS") { tyks++ }
  }
  for (let i = 0; i < props.lista3.length; i++) {
    if (props.lista3[i].healthCareDistrict === "HYKS") { hyks++ }
    if (props.lista3[i].healthCareDistrict === "OYS") { oys++ }
    if (props.lista3[i].healthCareDistrict === "KYS") { kys++ }
    if (props.lista3[i].healthCareDistrict === "TAYS") { tays++ }
    if (props.lista3[i].healthCareDistrict === "TYKS") { tyks++ }
  }

  return (
  <>
    <div id="tuottaja">
      <h2>Orders / vaccines per producer</h2>
      <h3><span className="syringe"><FaSyringe fontSize="1.2em"/></span> Vaccines by Antiqua</h3>
      <span>Orders {props.lista1.length}</span>
      <br/>
      <span>Vaccines {AntVaccines}</span>
      <h3><span className="syringe"><FaSyringe fontSize="1.2em"/></span> Vaccines by SolarBuddhica</h3>
      <span>Orders {props.lista2.length}</span>
      <br/>
      <span>Vaccines {SolVaccines}</span>
      <h3><span className="syringe"><FaSyringe fontSize="1.2em"/></span> Vaccines by Zerpfy</h3>
      <span>Orders {props.lista3.length}</span>
      <br/>
      <span>Vaccines {ZerVaccines}</span>
    </div>
    <div id="hospital">
      <h2>Orders by healthcare district</h2>

      <PieChart
        data={[
          { title: 'HYKS', value: hyks, color: '#ff6c0a' },
          { title: 'OYS', value: oys, color: '#ff781f' },
          { title: 'KYS', value: kys, color: '#ff8533' },
          { title: 'TAYS', value: tays, color: '#ff9147' },
          { title: 'TYKS', value: tyks, color: '#ff9d5c' },
        ]}
        viewBoxSize={[120, 120]}
        label={({ dataEntry }) => dataEntry.title + " " + dataEntry.value}
        labelPosition={70}
        radius={42}
        labelStyle={() => ({
          fontSize: '5px',
          fontFamily: 'Segoe UI',
        })}
        segmentsShift={2}
      />;

    </div>
  </>
  )

}

export default App;