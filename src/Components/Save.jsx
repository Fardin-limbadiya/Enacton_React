import React, { useState, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Stores", href: "/", current: false },
  { name: "Explore", href: "/Explore", current: false },
  { name: "Save", href: "/save", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Save = () => {
  const [savedStores, setSavedStores] = useState(() => {
    const saved = localStorage.getItem("savedStores");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedStores", JSON.stringify(savedStores));
  }, [savedStores]);

  const handleRemove = (storeId) => {
    const updatedStores = savedStores.filter(store => store.id !== storeId);
    setSavedStores(updatedStores);
  };

  return (
    <div className="my-[50px]">
      {/* Navigation */}
      <Disclosure as="nav" className="border-b border-gray-200 bg-white fixed w-full top-0 left-0 z-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between items-center">
                <div className="flex items-center">
                  <img className="h-8 w-auto"
                    src="https://media.licdn.com/dms/image/v2/C510BAQGj3kEbMho6ag/company-logo_200_200/company-logo_200_200/0/1630569477194/enacton_technologies_logo?e=2147483647&v=beta&t=4ski8Yi511qO8MXjFUDvt4PYfFYrhiDDx1tcsSdlNwU"
                    alt="Company Logo" />
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href} className={classNames(item.current ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium")} aria-current={item.current ? "page" : undefined}>
                        {item.name}</a>
                    ))}
                  </div>
                </div>

                {/* Notification Icon */}
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faBell} style={{ height: "25px", width: "25px" }} />

                  {/* Profile Picture */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <img className="h-8 w-8 rounded-full object-cover" src={user.imageUrl} alt={user.name} />
                    </Menu.Button>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name} as="a" href={item.href} className={classNames(
                      item.current
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                    )} aria-current={item.current ? "page" : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/*content*/}
      <div className="py-10 pt-24">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Saved Stores</h2>
          {savedStores.length === 0 ? (
            <p>No stores saved yet.</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {savedStores.map((store) => (
                <div key={`${store.id}-${store.name}`}
                  className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <img src={store.logo} alt={`${store.name} logo`} className="w-40 h-18 object-cover rounded-lg" />
                    <span className="text-lg font-medium text-gray-700">{store.name}
                    </span>
                    {store.cashback_enabled === 1 && (
                      <span className="text-sm text-green-600">Up to {store.cashback_percent}% cashback (${store.cashback_amount})</span>)}
                    <div className="flex space-x-4">
                      <label className="bg-green-100 text-black px-3 py-1 rounded">Status: {store.status}</label>
                      <label className="bg-green-100 text-black px-3 py-1 rounded">Cats: {store.cats}</label>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <div className="mt-auto flex space-x-2 pt-4">
                    <button onClick={() => handleRemove(store.id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600">Remove</button>
                    <a href={store.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Shop</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Save;
