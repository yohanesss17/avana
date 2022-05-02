import React from "react";
import logo from '../../assets/img/logo.webp';
import profile from '../../assets/img/user.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import "./sidebar.scss";
import Menu from './Menu.jsx'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: null,
            selectedChildMenu: null,
            menu: null
        };
    }

    openMenu = menu => {
        if (this.state.selectedMenu === menu) {
            menu = null;
        }
        this.setState({
            selectedMenu: menu
        });
    }

    openChildMenu = menu => {
        if (this.state.selectedChildMenu === menu) {
            menu = null;
        }
        this.setState({
            selectedChildMenu: menu
        });
    }

    render() {
        return (
            <div className="bg-[#1D1D1D] lg:h-[100vh] py-[2rem] lg:fixed w-full lg:w-2/12 overflow-auto sidebar">
                <div className='logo-img px-[4rem]'>
                    <img src={logo} className="w-full " alt="" />
                </div>
                <div className="px-[2rem]">
                    <img src={profile} className=" mx-auto w-[100px] rounded-[70%]  mb-[1rem] mt-[4rem]" alt="" />
                    <h3 className='text-white text-center text-[18px] font-semibold'>
                        Avriza Bramantyo
                    </h3>
                </div>
                <div>
                </div>
                <div className="px-[2rem] lg:pl-[2rem] pt-[2rem]">
                    <ul className="w-full sidebar-menu cursor-pointer">
                        {this.props.menu.map((prop, key) => {
                            if (prop.isShowed == true) {
                                return (
                                    <li
                                        className={`text-white text-[#D5D5D5] capitalize text-[14px] lg:pl-[1rem] mb-[1rem] ${prop.isAllowed === false ? 'cursor-not-allowed' : "cursor-pointer"}`}
                                        key={key}
                                    >
                                        {prop.childs !== undefined ? (
                                            <div >
                                                <div className={`flex flex-wrap px-[2.2rem] py-[1rem] ${this.state.selectedMenu === prop.id ? "active" : ""}`} onClick={() => prop.isAllowed === true ? this.openMenu(prop.id) : null}>
                                                    <div className="basis-10/12">
                                                        {prop.id}
                                                    </div>
                                                    <div className="basis-2/12">
                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                    </div>
                                                </div>
                                                <div className={`pl-[2rem] ${this.state.selectedMenu === prop.id ? 'block' : 'hidden'}`}>
                                                    <ul className=" pl-[1rem] mt-[1rem] mb-[1rem]"  >
                                                        {prop.childs.map((child, childKey) => {
                                                            if (child.isShowed == true) {

                                                                return (
                                                                    <li className="text-[#515151] text-[14px] pb-[1rem] py-[0.5rem]" key={childKey} >
                                                                        <Menu menu={child} openChildMenu={this.openChildMenu} selectedChildMenu={this.state.selectedChildMenu} />
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={` px-[2.2rem] py-[1rem] ${this.state.selectedMenu === prop.id ? "active" : ""}`} onClick={() => prop.isAllowed === true ? this.openMenu(prop.id) : null}>
                                                {prop.id}
                                            </div>
                                        )}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}
export default connect(mapStateToProps)(Sidebar);