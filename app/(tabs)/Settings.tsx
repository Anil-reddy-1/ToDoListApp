import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



type Todo={
    title:String;
    date:Date;
    status:boolean;
    id:number;
  };

export default function  Settings () {

    

 const [Completedtodos,setCompletedtodos]=useState<Todo[]>([]);


  useEffect( ()=>{
    const loadData= async ()=>{
     const loadedData= await AsyncStorage.getItem('completedTodos');
     if(loadedData){
      setCompletedtodos(JSON.parse(loadedData))
     }
     else{
      setCompletedtodos([]);
     }
    }
    loadData();
  },[])

  async function clearCompletedTodo(){
    setCompletedtodos([]);
    await AsyncStorage.setItem('completedTodos',JSON.stringify(Completedtodos));
  }


  async function deleteCompletedtodo(id:any){
    let tempData= Completedtodos;
    tempData=tempData.filter((item)=>(item.id!=id));
    setCompletedtodos([...tempData]);
    await AsyncStorage.setItem('completedTodos',JSON.stringify(Completedtodos));
  }







  return (
    <View  style={{marginTop:20,margin:8,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:24,fontWeight:800,margin:10,}}>Completed Tasks</Text>
      <FlatList 
      data={Completedtodos}
      renderItem={({item,index}:any)=>(
                <View style={styles.cardContainer}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.time}>{item.date.toLocaleString()}</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>{deleteCompletedtodo(item.id)}}><Text style={styles.deleteButton}>Delete</Text></TouchableOpacity>
                  </View>
                  
          
                </View>
            
                )}
              
              numColumns={1}
              />

              <View>
                <TouchableOpacity onPress={clearCompletedTodo}>
                  <Text>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
      </View>
      )}

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
    fontSize:16,
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
    width:"100%",
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
    margin:6,
    padding:6,
    backgroundColor:"#146edbff",
    color:"#ffffff",
    borderRadius:5,
  },
  deleteButton:{
    margin:6,
    padding:6,
    backgroundColor:"#cf5757ff",
    color:"#ffff",
    borderRadius:5,
  },

})


