import AdminArticles from "./AdminArticles";
import AdminOrders from "./AdminOrders";
import { useState, useEffect } from "react";

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        for(let elt of document.getElementsByClassName("admin-tab")){
            elt.classList.remove("selected-tab"); 
        }
        document.getElementById("tab-"+activeTab).classList.add("selected-tab");
    }, [activeTab]);

    return (
        <div>
            <h3>Gérez votre e-commerce</h3>
            <div className="tabs">
                <span className="admin-tab" id="tab-1"  onClick={() => setActiveTab(1)}>Articles</span>
                <span className="admin-tab" id="tab-2" onClick={() => setActiveTab(2)}>Catégories</span>
                <span className="admin-tab" id="tab-3" onClick={() => setActiveTab(3)}>Commandes</span>
            </div>
            <div className="admin-content">
                {activeTab === 1 &&
                    <AdminArticles />
                }
                {activeTab === 2  &&
                    <div></div>

                }
                {activeTab === 3 &&
                    <AdminOrders/>
                }
            </div>
        </div>
    );
}