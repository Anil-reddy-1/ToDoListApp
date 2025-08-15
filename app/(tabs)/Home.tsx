import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



  type Todo={
      title:String;
      date:Date;
      status:boolean;
      id:number;
    };
  

const Home =  () => {


  const  [data,setData]=useState<Todo[]>([]);
  const [input,setInput]=useState("");
  const router = useRouter();
  
  useEffect(()=>{
      async function loadData() {
    const localData= await AsyncStorage.getItem('Data');
    if(localData){
      setData(JSON.parse(localData));
    }
  }

  loadData();
  },[]);

   async function Addtodo(){
    let a=input.trim();
    if(a!=""){
      setData([...data,{title: input,date:new Date(),status:false,id:(10000+data.length)}]);
      setInput("");
      await AsyncStorage.setItem('Data',JSON.stringify(data));
    }
  }

  async function deletetodo(id:number){
    let tempdata = data;
    tempdata=tempdata.filter((item)=>(item.id!=id));
    setData([...tempdata]);
    await AsyncStorage.setItem('Data',JSON.stringify(data));
    
  }

  async function Completedtodo(id:number){
    let tempdata = data.find((item)=>(item.id==id));
    tempdata.date=new Date();
    let ctodos= await AsyncStorage.getItem('completedTodos');
    let strTodo=[];
    if(ctodos){
      strTodo= JSON.parse(ctodos);
    }
    strTodo.push(tempdata);
    
    await AsyncStorage.setItem('completedTodos',JSON.stringify(strTodo));
    deletetodo(id);
    
    
  }

  async function shiftUp(i:any){
    if(i>0){
      let cpy= data;
      [cpy[i-1],cpy[i]]=[cpy[i],cpy[i-1]];
      setData([...cpy]);
      await AsyncStorage.setItem('Data',JSON.stringify(data));
    }
  }

  async function shiftDown(i:any){
    if(i<data.length-1){
      let cpy= data;
      [cpy[i+1],cpy[i]]=[cpy[i],cpy[i+1]];
      setData([...cpy]);
       await AsyncStorage.setItem('Data',JSON.stringify(data));
    }
 
  }





  
    

  


  return (<>
    <View style={styles.header}>
      <Text style={styles.headerText}>To Do App</Text>
    </View>
    <View style={styles.container}>
    <TextInput placeholder='Add a to Do' value={input} onChangeText={setInput} style={styles.textinput}/>
    <TouchableOpacity  onPress={Addtodo}><Text style={styles.button}>Add Todo</Text></TouchableOpacity>
    </View>
    <FlatList
      data={data}
      renderItem={({item,index})=>( 
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.date.toLocaleString()}</Text>
          </View>
          <View style={{flexDirection:"row",gap:5,justifyContent:"center",alignItems:"center"}}>
          <View>
            <TouchableOpacity onPress={()=>{Completedtodo(item.id)}}><Text style={styles.deleteButton}>Completed</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{deletetodo(item.id)}}><Text style={styles.deleteButton}>Delete</Text></TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={()=>shiftUp(index)}><Text style={styles.upButton}>👆</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>shiftDown(index)}><Text style={styles.upButton}>👇</Text></TouchableOpacity>
          </View>
          </View>
        </View>
        )}
      
      numColumns={1}
    >

    </FlatList>

        <View>
          <TouchableOpacity onPress={()=>router.push('/Settings')} style={styles.button}>
            <Text>
              Completed Tasks
            </Text>
          </TouchableOpacity>
        </View>


    </>
  )
}

export default Home

const styles = StyleSheet.create({
  header:{
    margin:20,
  },
  headerText:{
    fontSize:20,
    fontWeight:700,
  },
  textinput:{
    borderWidth:0.5,
    borderColor:"grey",
    borderRadius:5,
    width:"70%",
    padding:4,
    margin:6,
    marginLeft:10,
  },
  upButton:{
    margin:2,
    backgroundColor:"#54d887ff",
    fontSize:20,

  },
  container:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    
  },
  cardContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    height:80,
    fontSize:14,
    padding:8,
    margin:8,
    backgroundColor:"#e3e3e3ff"
  },
  title:{
    fontSize:18,
    fontWeight:600,
  },
  time:{
    fontSize:12,
    color:"#3d3d3dff"
  },
  button:{
    margin:3,
    padding:6,
    backgroundColor:"#146edbff",
    color:"#ffffff",
    borderRadius:5,
  },
  deleteButton:{
    margin:3,
    padding:3,
    backgroundColor:"#cf5757ff",
    color:"#ffff",
    borderRadius:5,
    fontWeight:700,
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
  },

})