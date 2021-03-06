import React from "react";
import { connect } from "react-redux";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Submenu from './Submenu.jsx'
import "./Dashboard.scss"

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.temporary_menu = props.menuList;
        this.state = {
            menuOpen: null,
            left: 4
        }
    }

    //  for hide / show menu
    updateShowValue = (name) => {
        this.temporary_menu.forEach(value => {
            if (value.id === name) {
                value.isShowed = !value.isShowed;
            } else {
                if (value.childs !== undefined) {
                    value.childs = this.checkShowValue(value.childs, name)
                }
            }
        })

    }

    checkShowValue(array, name) {
        array.forEach(array_value => {
            if (array_value.id === name) {
                array_value.isShowed = !array_value.isShowed;
            } else {
                if (array_value.childs !== undefined) {
                    array_value.childs = this.checkShowValue(array_value.childs)
                }
            }
        })
        return array;
    }

    //  for active / deactive menu
    updateAllowValue = (name) => {
        this.temporary_menu.forEach(value => {
            if (value.id === name) {
                value.isAllowed = !value.isAllowed;
            } else {
                if (value.childs !== undefined) {
                    value.childs = this.checkAllowedValue(value.childs, name)
                }
            }
        })
    }

    checkAllowedValue(array, name) {
        array.forEach(array_value => {
            if (array_value.id === name) {
                array_value.isAllowed = !array_value.isAllowed;
            } else {
                if (array_value.childs !== undefined) {
                    array_value.childs = this.checkAllowedValue(array_value.childs)
                }
            }
        })
        return array;
    }

    // for open / hide menu
    openSubMenu = menu => {
        if (this.state.menuOpen === menu) {
            menu = null;
        }
        this.setState({
            menuOpen: menu
        });

    }

    render() {
        return (
            <div className="w-full bg-[#2C2C2C] py-[2rem] text-white">

                {/* Title */}
                <div className="w-full lg:container mx-auto flex flex-wrap px-[2rem] pt-[2rem] ">

                    <div className="basis-9/12 lg:basis-10/12 border-b-2 border-[#3E3E3E] pb-[1.5rem]">
                        <h1 className="text-[31px] font-semibold">
                            Setting Menu
                        </h1>
                    </div>

                    {/* Update Menu */}
                    <div className="basis-2/12 border-b-2 border-[#3E3E3E] pb-[1.5rem] flex items-center justify-end">
                        <button className="btn bg-[#FDB817] text-white text-[16px] font-semibold px-[1.5rem] py-[.7rem] rounded-[5px]" onClick={() => this.props.handleTest(this.temporary_menu)}>Save</button>
                    </div>
                    {/* End Update Menu */}

                </div>
                {/* End Title */}

                <div className="container mx-auto py-[2rem] flex flex-wrap">

                    {/* Menu Control */}
                    <div className="basis-full lg:basis-6/12 flex flex-wrap order-2 lg:order-1">
                        <div className="w-full lg:w-11/12 flex flex-wrap  my-[1rem] mx-[2rem] py-[1rem] px-[1rem]">
                            <div className="basis-6/12 pl-[2rem]">
                                Menu
                            </div>
                            <div className="basis-2/12 flex justify-end">
                                Show
                            </div>

                            <div className="basis-2/12 flex justify-end">
                                Active
                            </div>
                        </div>
                        {this.temporary_menu.map((value, key) => {
                            return (
                                <div className="w-10/12 lg:w-full flex flex-wrap items-center bg-[#3E3E3E] rounded-[10px] my-[1rem] mx-[2rem] py-[1rem] px-[1rem]" key={key}>
                                    <div className="basis-6/12 capitalize pl-[2rem]">
                                        {value.id}
                                    </div>
                                    <div className="basis-2/12 flex justify-end">
                                        <div className="my-[0.5rem]">
                                            <div className="toggle slim colour">
                                                <input id={value.id + 'show'} className="toggle-checkbox hidden" type="checkbox" defaultChecked={value.isShowed} onChange={e => this.updateShowValue(value.id)} />
                                                <label htmlFor={value.id + 'show'} className="toggle-label block w-12 h-[14px] rounded-full transition-color duration-150 ease-out"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basis-2/12 flex justify-end">
                                        <div className="my-[0.5rem]">
                                            <div className="toggle slim colour">
                                                <input id={value.id + 'allow'} className="toggle-checkbox hidden" type="checkbox" defaultChecked={value.isAllowed} onChange={e => this.updateAllowValue(value.id)} />
                                                <label htmlFor={value.id + 'allow'} className="toggle-label block w-12 h-4 rounded-full transition-color duration-150 ease-out"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basis-2/12 flex justify-end lg:pr-[2rem] cursor-pointer" onClick={e => this.openSubMenu(value.id)}>
                                        {value.childs !== undefined ? (
                                            <div>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={`basis-full content-end pt-[1rem] pl-[2rem] ${this.state.menuOpen === value.id ? "block" : "hidden"}`}>
                                        {value.childs !== undefined ? (
                                            value.childs.map((child, childKey) => {
                                                return (
                                                    <Submenu child={child} key={childKey} updateShowValue={this.updateShowValue} updateAllowValue={this.updateAllowValue} leftValue={this.state.left} />
                                                )
                                            })
                                        ) : null}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* End Menu Control */}

                    {/* Feature Information */}
                    <div className="w-[350px] lg:w-[400px] h-[230px] bg-[#3E3E3E] lg:mt-[6.5rem] px-[2rem] py-[1rem] mx-auto lg:mx-[0px] rounded-[10px] order-1 lg:order-2">
                        <h3 className="text-[#fff] text-[18px]"><span className=" font-semibold">Apa itu Active dan Show?</span> ????</h3>
                        <p className="pt-[1rem] text-[14px] text-justify">
                            Show adalah keadaan menu muncul di sidebar, sedangkan Hide adalah keadaan menu tidak muncul pada sidebar
                        </p>

                        <p className="pt-[1rem] text-[14px] text-justify">
                            Active adalah keadaan menu dapat diklik di sidebar, sedangkan Deactive adalah keadaan menu tidak dapat di klik di sidebar ????
                        </p>
                    </div>
                    {/* End Feature Information */}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuList: state.menu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleTest: (menu) => dispatch({
            type: 'HANDLE_TEST',
            newMenu: menu
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);