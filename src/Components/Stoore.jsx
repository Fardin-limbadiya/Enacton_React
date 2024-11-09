import React, { Fragment, useState, useCallback } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Categories from "./Categories";
import AllStores from "./AllStores";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const user = {
      name: "Tom Cook",
      email: "tom@example.com",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
      { name: "Stores", href: "/", current: true },
      { name: "Explore", href: "/Explore", },
      { name: "Save", href: "/Save" },
];

const userNavigation = [];

function classNames(...classes) {
      return classes.filter(Boolean).join(" ");
}

const Store = () => {
      const [cashbackEnabled, setCashbackEnabled] = useState(0);
      const [selectedLetter, setSelectedLetter] = useState(" ");
      const [sortOption, setSortOption] = useState("Popularity");
      const [savedStores, setSavedStores] = useState([]);
      const navigate = useNavigate();

      const handleCheckboxChange = (e) => {
            setCashbackEnabled(e.target.checked ? 1 : 0);
      };

      const handleLetterClick = (letter) => {
            setSelectedLetter(letter);
      };

      const handleSortChange = (e) => {
            setSortOption(e.target.value);
      };

      const handleSaveStore = useCallback((store) => {
            const savedStores = JSON.parse(localStorage.getItem("savedStores")) || [];
            savedStores.push(store);
            localStorage.setItem("savedStores", JSON.stringify(savedStores));
            setSavedStores(savedStores);
      }, []);

      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      return (
            <div>
                  <div className="min-h-full">
                        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
                              {({ open }) => (
                                    <>
                                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                <div className="flex h-16 justify-between">
                                                      <div className="flex">
                                                            <div className="flex flex-shrink-0 items-center justify-between">
                                                                  <img className="block h-8 w-auto lg:hidden"
                                                                        src="https://media.licdn.com/dms/image/v2/C510BAQGj3kEbMho6ag/company-logo_200_200/company-logo_200_200/0/1630569477194/enacton_technologies_logo?e=2147483647&v=beta&t=4ski8Yi511qO8MXjFUDvt4PYfFYrhiDDx1tcsSdlNwU"
                                                                        alt="Enacton" />
                                                                  <img className="hidden h-8 w-auto lg:block"
                                                                        src="https://media.licdn.com/dms/image/v2/C510BAQGj3kEbMho6ag/company-logo_200_200/company-logo_200_200/0/1630569477194/enacton_technologies_logo?e=2147483647&v=beta&t=4ski8Yi511qO8MXjFUDvt4PYfFYrhiDDx1tcsSdlNwU"
                                                                        alt="Enacton" />
                                                            </div>
                                                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                                                  {navigation.map((item) => (
                                                                        <a key={item.name} href={item.href}
                                                                              className={classNames(
                                                                                    item.current ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                                                                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium")}>{item.name}</a>))}
                                                            </div>
                                                      </div>
                                                      {/* Notification Icon */}
                                                      <FontAwesomeIcon style={{ height: "25px", width: "25px", marginLeft: "950px", marginTop: "20px" }} icon={faBell} />
                                                      <Menu as="div" className="relative ml-3">
                                                            <div>
                                                                  <img style={{ marginTop: "15px" }} className="flex items-center h-8 w-8 rounded-full justify-center" src={user.imageUrl} alt="User" />
                                                            </div>
                                                      </Menu>
                                                </div>
                                          </div>
                                          <Disclosure.Panel className="sm:hidden">
                                                <div className="space-y-1 pb-3 pt-2">
                                                      {navigation.map((item) => (
                                                            <Disclosure.Button
                                                                  key={item.name} as="a" href={item.href}
                                                                  className={classNames(
                                                                        item.current ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                                                                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
                                                                  {item.name}
                                                            </Disclosure.Button>))}
                                                </div>
                                          </Disclosure.Panel>
                                    </>
                              )}
                        </Disclosure>
                        <div className="py-10">
                              <header>
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                                          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Stores Gallery</h1>
                                    </div>
                              </header>
                              <main>
                                    <div className="mx-auto grid grid-cols-3 grid-flow-col max-w-7xl sm:px-6 lg:px-8">
                                          <Categories className="bg-white shadow-xl min-h-4" />
                                    </div>
                                    <div style={{ marginLeft: "350px", marginTop: "20px" }}>
                                          <a onClick={() => handleLetterClick(" ")} style={{ marginRight: "6px", cursor: "pointer" }}>All</a>
                                          {alphabet.map((letter) => (
                                                <a key={letter} style={{ marginLeft: "6px", marginRight: "2px", cursor: "pointer" }}
                                                      onClick={() => handleLetterClick(letter)}>{letter} </a>
                                          ))}
                                          <input
                                                style={{ marginLeft: "30px" }}
                                                id="cs"
                                                type="checkbox"
                                                onChange={handleCheckboxChange}
                                                checked={cashbackEnabled === 1}
                                          />
                                          <label htmlFor="cs">Cashback</label>
                                          {/* Search Icon and Input */}
                                          <AllStores
                                                cashbackEnabled={cashbackEnabled}
                                                selectedLetter={selectedLetter}
                                                sortOption={sortOption}
                                                handleSaveStore={handleSaveStore} // Pass the save function as a prop to AllStores
                                                className="bg-white shadow-xl col-span-2 min-h-4"/>
                                    </div>
                              </main>
                        </div>
                  </div>
            </div>
      );
}

export default Store;
