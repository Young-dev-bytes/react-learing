// 引入count UI组件
import CountUI from "../../components/Count";
// 引入store
// import store from '../../redux/store'
// 引入connect 用于连接UI组件和redux
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    count: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

// 连接UI组件
// 使用connect创建并且暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
