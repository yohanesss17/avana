import React from "react";
import "./sidebar.scss";

class Menu extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.menu.childs !== undefined) {
            return (
                <div >
                    <div className={`py-[1rem] text-[#515151] border-b-[1px] border-[#515151] flex flex-wrappy-[1rem] ${this.props.selectedChildMenu === this.props.menu.id ? "active" : ""}`} onClick={() => this.props.menu.isAllowed === true ? this.props.openChildMenu(this.props.menu.id) : null}>
                            {this.props.menu.id}
                    </div>
                    <div className={`pl-[1rem] `}>
                        <ul className=" mt-[1rem]"  >
                            {this.props.menu.childs.map((child, childKey) => {
                                if (child.isShowed == true) {

                                    return (

                                        <li className={` text-[#515151] capitalize text-[14px] pl-[1rem] py-[0.5rem] ${child.isAllowed === false ? 'cursor-not-allowed' : "cursor-pointer"}`}
                                            key={child.id + '-' + childKey} >
                                            <Menu menu={child} openChildMenu={this.props.openChildMenu} selectedChildMenu={this.props.selectedChildMenu} />
                                        </li>
                                    )
                                }
                            })
                            }
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`py-[0.5rem] text-[#515151] border-b-[1px] border-[#515151] ${this.props.menu.isAllowed === false ? 'cursor-not-allowed' : "cursor-pointer"} ${this.props.selectedChildMenu === this.props.menu.id ? "active" : ""} `} onClick={() => this.props.menu.isAllowed === true ? this.openMenu(this.props.menu.id) : null}>
                    {this.props.menu.id}
                </div>
            )
        }
    }
}

export default Menu;