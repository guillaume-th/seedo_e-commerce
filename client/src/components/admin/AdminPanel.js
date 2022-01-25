import AdminArticles from "./AdminArticles";
import AdminOrders from "./AdminOrders";
import AdminCategory from "./AdminCategory";
import { useState, useEffect } from "react";

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        for (let elt of document.getElementsByClassName("admin-tab")) {
            elt.classList.remove("selected-tab");
        }
        document.getElementById("tab-" + activeTab).classList.add("selected-tab");
    }, [activeTab]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Gérez votre e-commerce</h1>
            <div className="tabs">
                <button className="boxShadow" onClick={() => setActiveTab(1)} className="admin-tab" id="tab-1" ><span   >Articles</span></button>
                <button className="boxShadow" onClick={() => setActiveTab(2)} className="admin-tab" id="tab-2"><span  >Catégories</span></button>
                <button className="boxShadow" onClick={() => setActiveTab(3)} className="admin-tab" id="tab-3"><span  >Commandes</span></button>
            </div>
            <div className="admin-content">
                {activeTab === 1 &&
                    <AdminArticles />
                }
                {activeTab === 2 &&
                    <AdminCategory />
                }
                {activeTab === 3 &&
                    <AdminOrders />
                }
            </div>
        </div>
    );
}