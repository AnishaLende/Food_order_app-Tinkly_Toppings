import {useEffect, useState } from "react";
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

  const [meals, setMeals] =useState([]);
  const [isLoading, setIsLoading] =useState(true);
  const [httpError, setHttpError] =useState();

  useEffect(() =>{
    const fetchMeals = async()=>{
      const response = await fetch('https://food-order-app-6e89b-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok){
        throw new Error ('Something went wrong!!');          //whenever we create such a string it is shown in error.message which is executed below in catch block
      }

      const responseData = await response.json();

      const loadedMeals =[];
      
      for(const key in responseData){
        loadedMeals.push({
          id: key,                                    //m1, m2 ...are key here
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    
      fetchMeals().catch(error =>{
        setIsLoading(false);
        setHttpError(error.message);
      });
  },[]);

  if(isLoading ){
    return(
      <section className={classes.MealsLoading}>
        <p> Loading...</p>
      </section>
    );
  }

  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;