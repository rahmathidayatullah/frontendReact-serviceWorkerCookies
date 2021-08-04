import React, { useState, useEffect } from "react";

import Table from "component/Table";
import ModalNotice from "component/ModalNotice";
import ModalNotConnection from "component/ModalNotConnection";
import ModalCookie from "component/ModalCookie";
import ChartCircle from "component/ChartCircle";
import ChartHorizontal from "component/ChartHorizontal";
import ChartVertical from "component/ChartVertical";

export default function Index() {
  const months = ["May", "Apr", "Mar", "Feb", "Jan"];
  // let persenMonths = [0, 0, 0, 0, 0];

  // const persenMonths = [70, 40, 80, 47, 76];
  const [persenMonth, setPersenMonth] = useState([0, 0, 0, 0, 0]);

  // const chart2 = [80, 70, 60, 60, 84, 100, 92, 80, 100, 92, 80];
  const [chart2, setChart2] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const days = ["01", "02", "03", "04", "05", "06", "07"];
  const [online, setOnline] = useState(true);

  const [checkAll, setCheckAll] = useState(false);
  const [dummyTemp, setDummyTemp] = useState();
  const [jumlahSelect, setJumlahSelect] = useState(0);

  const [showNotice, setShowNotice] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
  const selectData = (e, i) => {
    let _temp = [...dummyTemp];
    let countCheckTrue = 0;
    if (e.target.name === "selected") {
      _temp[i]["selected"] = e.target.checked;
    } else {
      _temp.forEach((data) => {
        data.selected = e.target.checked;
      });
      setCheckAll(e.target.checked);
    }
    _temp.forEach((data) => {
      if (data.selected) {
        countCheckTrue += 1;
      }
    });

    if (_temp.length === countCheckTrue) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
    setDummyTemp(_temp);
    setJumlahSelect(countCheckTrue);

    if (countCheckTrue === 0) {
      setShowNotice(false);
    } else {
      setShowNotice(true);
    }
  };

  const deleteData = (dummyTemp) => {
    let temp = [...dummyTemp];
    let data = temp.filter((item, i) => {
      return item.selected === false;
    });
    setDummyTemp(data);
    setShowNotice(false);
  };

  const fetchJSon = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setDummyTemp(myJson);
      })
      .catch(function (err) {
        console.log("error");
      });
  };

  const checkTime = (value) => {
    // 1 menit by miliseconds
    let menitPlus = 60000;
    // ambil data sekarang + 1 menit
    let dataSekarang = new Date();
    // tambahkan data waktu sekarang dengan 1 menit
    dataSekarang.setTime(dataSekarang.getTime() + menitPlus);
    // convert to new date
    // waktu sekarang ditambah 1 menit,convert to miliseconds (waktu tujuan)
    let expiredTime = new Date(dataSekarang);
    // set to cookie
    document.cookie = `username=rahmat;expires=${expiredTime}`;
    let dateNew = new Date(dataSekarang).getTime();
    const times = setInterval(() => {
      if (value) {
        clearInterval(times);
        setShowCookie(false);
      }
      // waktu tujuan dikurang waktu sekarang,convert to moiiliseconds(waktu sekarang)
      let dateNow = new Date().getTime();
      // ambil selisih waktu nya
      let selisih = dateNew - dateNow;
      // jika waktu sudah berakhir maka dengan selisih 1 menit by miliseconds, maka tampilkan notif cookie
      if (selisih < -60000) {
        // alert("tampil cokkie");
        if (showCookie) {
          clearInterval(times);
          setShowCookie(false);
        } else {
          clearInterval(times);
          setShowCookie(true);
        }
      }
    }, 1000);
  };
  useEffect(() => {
    fetchJSon();
    if (!navigator.onLine) {
      setOnline(false);
    }
    let persenMonthsNew = [70, 40, 80, 47, 76];
    setPersenMonth(persenMonthsNew);

    let chart2 = [80, 70, 60, 60, 84, 100, 92, 80, 100, 92, 80];
    setChart2(chart2);
  }, []);

  useEffect(() => {
    checkTime();
  }, [showCookie]);

  return (
    <div className="main">
      {/* modal cookie value */}
      <ModalCookie showCookie={showCookie} checkTime={() => checkTime(true)} />

      {/* modal not connection*/}
      <ModalNotConnection online={online} setOnline={() => setOnline(true)} />

      <div className={`container ${showCookie ? "mt-5" : ""}`}>
        <header>
          <h1>Charts and Table Visualization</h1>
        </header>
        <main>
          <div>
            <article>
              <section className="section-1">
                <div className="card-1">
                  <h2>Chart 1</h2>
                  <ChartHorizontal
                    months={months}
                    days={days}
                    persenMonth={persenMonth}
                  />
                </div>
                <div className="card-2">
                  <h2>Chart 2</h2>
                  <ChartVertical chart2={chart2} />
                </div>
                <div className="card-3">
                  <h2>Chart 3</h2>
                  <ChartCircle />
                </div>
              </section>
              <section className="section-2">
                <Table
                  selectData={selectData}
                  checkAll={checkAll}
                  dummyTemp={dummyTemp}
                />
              </section>
            </article>
          </div>
        </main>
      </div>
      {/* modal notice */}
      <ModalNotice
        setShowNotice={() => setShowNotice(false)}
        jumlahSelect={jumlahSelect}
        deleteData={() => deleteData(dummyTemp)}
        showNotice={showNotice}
      />
    </div>
  );
}
