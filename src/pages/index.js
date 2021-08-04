import React, { useState, useEffect } from "react";
import IconAssign from "../assets/icon/Icon/assign";
import IconTrash from "../assets/icon/Icon/trash";
import IconClose from "../assets/icon/Icon/close";
import IconInfo from "../assets/icon/Icon/info";
import IconUnConnect from "../assets/icon/Icon/notconnect.png";

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
      <div className={`cookie ${showCookie ? "left-0" : "left-100"}`}>
        <IconInfo />
        <p>Show cookies first load and expired 1 minutes</p>
        <button onClick={() => checkTime(true)}>OK</button>
      </div>
      {/* modal not connection*/}

      <div className={`modal-main ${online ? "opacity-0" : "opacity-1"}`}>
        <div className="modal-content">
          <IconClose onClick={() => setOnline(true)} />
          <img src={IconUnConnect} />
          <p className="modal-title">No internet connection</p>
          <p className="modal-desc">
            Seems like you're not connected to the internet! Check your
            connection and refresh the page.
          </p>
        </div>
      </div>

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
                  <div className="sub-card-1">
                    <ul>
                      {months.map((month, i) => {
                        return (
                          <li key={i}>
                            <p>{month}</p>
                            <div className="wrap-shape">
                              <div
                                className="persen-shape"
                                style={{ width: `${persenMonth[i]}%` }}
                              ></div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="foot">
                      <div className="space-0"></div>
                      <ul>
                        {days.map((day, i) => {
                          return <li key={i}>{day}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-2">
                  <h2>Chart 2</h2>
                  <div className="sub-card-2">
                    <div className="wrap-shape-2">
                      <ul>
                        {chart2.map((chart, i) => {
                          return (
                            <li key={i} style={{ height: `${chart}%` }}></li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="foot-2">
                      <div className="sub-foot-2">
                        <div className="rounded"></div>
                        <p>Text 1</p>
                      </div>
                      <div className="sub-foot-2">
                        <div className="rounded"></div>
                        <p>Text 2</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-3">
                  <h2>Chart 3</h2>
                  <div className="sub-card-3">
                    <figure className="chart" data-percent="75">
                      <figcaption>70%</figcaption>
                      <div className="bg-line"></div>
                      <svg width="200" height="200">
                        <circle
                          className="outer"
                          cx="95"
                          cy="95"
                          r="85"
                          transform="rotate(-90, 95, 95)"
                        />
                      </svg>
                    </figure>
                    <div className="wrap-text">
                      <div className="text">
                        <div className="rounded-3"></div>
                        <div className="desc-text">
                          <p className="title">Text 1</p>
                          <p className="desc">210 Guest(s)</p>
                        </div>
                      </div>
                      <div className="line"></div>
                      <div className="text">
                        <div className="rounded-3"></div>
                        <div className="desc-text">
                          <p className="title">Text 1</p>
                          <p className="desc">210 Guest(s)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="section-2">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            selectData(e, false);
                          }}
                          name="checkAll"
                          checked={checkAll}
                        />{" "}
                        Name
                      </th>
                      <th>Category</th>
                      <th>Availability</th>
                      <th>Arrival</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyTemp &&
                      dummyTemp.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <input
                                type="checkbox"
                                onChange={(e) => selectData(e, i)}
                                name="selected"
                                checked={item.selected}
                              />
                              {item.nama}
                            </td>
                            <td>{item.category}</td>
                            <td>{item.avaibility}</td>
                            <td>{item.arrival}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </section>
            </article>
          </div>
        </main>
      </div>
      {/* modal notice */}

      <div className={`notice-select ${showNotice ? "bottom-50" : "bottom-0"}`}>
        <div className="selected-v">
          <IconClose onClick={() => setShowNotice(false)} />
          <p>{jumlahSelect} Table Selected</p>
        </div>
        <div className="wrap-btn">
          <button className="btn-assign">
            <IconAssign />
            Assign Category
          </button>
          <button className="btn-delete" onClick={() => deleteData(dummyTemp)}>
            <IconTrash />
            Delete Table
          </button>
        </div>
      </div>
    </div>
  );
}
