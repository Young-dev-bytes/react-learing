import React from "react";

// class Demo extends Component {

//     state = {
//         count: 0
//     }

//     add=()=>{
//         const currentCount = this.state.count
//         // this.setState({
//         //     count: currentCount + 1
//         // })
//         this.setState((a, b)=>{
//             // 之前的state
//             console.log('state', a)
//             console.log('props', b);
//             return {count : currentCount + 1, age:90}
//         }, ()=>{
//             console.log('callback');
//         })

//         console.log('执行了');
//     }

//     render() {
//         return (
//             <div>
//                 <h2>当前求和为：{this.state.count}</h2>
//                 <button onClick={this.add}>点击+1</button>
//             </div>
//         )
//     }
// }

function Demo() {
  // const a = React.useState()
  // console.log(a[0]);
  // console.log(a[1]);

  const [count, setCount] = React.useState(0);

  console.log("count:", count); // undefined
  console.log("setCount:", setCount); // func

  const [person, setPerson] = React.useState({ name: "chen", age: 89 });

  console.log("person:", person); // undefined
  console.log("setPerson:", setPerson); // func

  function add() {
    // setCount(9)
    // setPerson({age:90})

    // setPerson(
    //   (p) => {
    //     console.log("before");
    //     console.log(p);
    //     return { age: 90 };
    //   },
    //   () => {}
    // );

    console.log("after");

    // a[0] = 89
    // a[1](90)
  }

  const add1 = (a) => {
    console.log("a----", a);
    return (b, c) => {
      console.log("b---", b.target);
      console.log("c---", c);
    };
  };

  // const add =(a)=>{
  //     console.log('点击了');
  //     console.log('a',a);

  //     return(b)=>{
  //         console.log('b',b);
  //     }
  // }

  return (
    <div>
      <button onClick={add}>点我+1</button>
    </div>
  );
}

export default Demo;
