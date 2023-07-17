import React, { Component } from 'react'
import ModalGioHang from './modalgiohang'
import DanhSachSanPham from './danhsachsanpham'
import shoeData from '../data/data.json'
import XemChiTiet from './xemchitiet'
import Modal from './components/modal'

export default class BaiTapGioHang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gioHang: [],
      sanPhamChiTiet: null,
      modal : 
      {
        status: "",
        title: "Xóa Sản Phẩm",
        content: "Bạn có muốn xóa sản phẩm hay không?"
      }
    }
  }

 

  themGioHang = (sp) => {
   const indexSp = this.state.gioHang.findIndex((item) => sp.id === item.id)
    let newGioHang = []
    if (indexSp === -1){
      sp.soLuong = 1 
      newGioHang = [...this.state.gioHang,sp]
    }else{
      sp.soLuong += 1
      this.state.gioHang.splice(indexSp,1,sp)
      newGioHang =this.state.gioHang
    }
    this.setState({
      gioHang:newGioHang
    })
  }
  xoaGioHang = (id) => {

    var gioHangCapNhat = this.state.gioHang.filter(sp => sp.id !== id)
    this.setState({
      gioHang: gioHangCapNhat
    })
  }
  tangGiamSoLuong = (id, tangGiam) => {
    var gioHangCapNhat = [...this.state.gioHang]
    let index = gioHangCapNhat.findIndex(sp => sp.id === id)
    if (tangGiam) {
      gioHangCapNhat[index].soLuong += 1
    } else {
      if (gioHangCapNhat[index].soLuong > 1) {
        gioHangCapNhat[index].soLuong -= 1
      }
    }
    this.setState({
      gioHang: gioHangCapNhat
    })
  }
  hanldeChangeSanPham = (sp) => {
    
    this.setState({
     
      sanPhamChiTiet: sp 
    })
  }

  render() {
    let tongSoLuong = this.state.gioHang.reduce((tsl, spGH, index) => {
      return tsl += spGH.soLuong
    }, 0)
    return (
      <div className='container'>
        <h3 className='text-center'>ShoeShop</h3>
        {/* <Modal modal={this.state.modal} xoaGioHang={this.xoaGioHang}/> */}
        <ModalGioHang tangGiamSoLuong={this.tangGiamSoLuong} xoaGioHang={this.xoaGioHang}  gioHang={this.state.gioHang}  modal={this.state.modal}/>
        <div className='text-right'><span className='text-danger' style={{ cursor: 'pointer', fontSize: '17px', fontWeight: 'bold' }} data-toggle='modal' data-target='#modelId' >Giỏ hàng ({tongSoLuong})</span></div>
        <DanhSachSanPham themGioHang={this.themGioHang} mangSanPham={shoeData} hanldeChangeSanPham={this.hanldeChangeSanPham}/>
        {this.state.sanPhamChiTiet ? <><XemChiTiet sanPham={this.state.sanPhamChiTiet} /></> : null}
      </div>
    )
  }
}
