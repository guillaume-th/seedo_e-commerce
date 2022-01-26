import AdminArticles from "./AdminArticles";
import AdminOrders from "./AdminOrders";
import AdminCategory from "./AdminCategory";
import AdminMysteryBox from "./AdminMysteryBox";
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
                <button className="boxShadow  admin-tab" onClick={() => setActiveTab(1)} id="tab-1" ><span>Articles</span></button>
                <button className="boxShadow admin-tab" onClick={() => setActiveTab(4)} id="tab-4" ><span>Mystery Box</span></button>
                <button className="boxShadow admin-tab" onClick={() => setActiveTab(2)} id="tab-2"><span>Catégories</span></button>
                <button className="boxShadow admin-tab" onClick={() => setActiveTab(3)} id="tab-3"><span>Commandes</span></button>
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
                {activeTab === 4 &&
                    <AdminMysteryBox />
                }
            </div>
        </div>
    );
}