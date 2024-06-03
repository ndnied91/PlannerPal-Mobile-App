import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/SupabaseConfig';
import { Alert } from 'react-native';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('dueDate'); // State variable for sorting option
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [selectedColorFilter, setSelectedColorFilter] = useState('');
  const [colorsInUse, setColorsInUse] = useState([]);

  const sortedTodos = todos.slice().sort((a, b) => {
    if (sortOption === 'default') {
      return a.id - b.id;
    } else if (sortOption === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'dueDate') {
      return b.dueDate.localeCompare(a.dueDate);
    }
    // Add more sorting options as needed
    return 0;
  });

  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  useEffect(() => {
    setCategories([...new Set(todos.map((todos) => todos.category))]);
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .select()
        .order('dueDate', { ascending: false }); // Change column_name to the column you want to sor
      if (error) {
        throw error;
      }
      setTodos(data || []);
      updateFilterColors();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateFilterColors = async () => {
    console.log('updateFilterColors');
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('bg_color')
        .eq('isCompleted', false)
        .order('dueDate', { ascending: false });

      if (error) {
        throw error;
      }

      setColorsInUse([...new Set(data.map((item) => item.bg_color))]);
    } catch (error) {
      console.log('Error fetching data:', error.message);
    }
  };

  const deleteTodo = async (id, callback) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            if (callback && typeof callback === 'function') {
              callback(); // Call the callback function
            }
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const { status, error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id);

              if (status === 204) {
                console.log(status);
                if (callback && typeof callback === 'function') {
                  callback(); // Call the callback function
                }
                Alert.alert('Item successfully deleted');

                fetchTodos();
              } else {
                console.error('Error deleting item:', error);
              }
            } catch (e) {
              console.error('Catch error:', e);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const updateCompletion = async (item, text) => {
    Alert.alert('Confirm Action', text, [
      {
        text: 'Cancel',
        style: 'destructive',
        onPress: () => {},
        textStyle: { color: 'red' },
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await supabase
              .from('todos')
              .update({ isCompleted: !item.isCompleted })
              .eq('id', item.id)
              .select();
            //
            fetchTodos();
          } catch (e) {
            console.error('Catch error:', e);
          }
        },
      },
    ]);
  };

  const updatePriorityStatus = async (item, callback) => {
    console.log('update to priority status for item', item);
    //make a call to api , update the item with the id that was provided
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({
          isPriority: !item.isPriority,
        })
        .eq('id', item.id)
        .select();

      if (!error) {
        if (callback && typeof callback === 'function') {
          callback(); // Call the callback function
          //close()
        }
        Alert.alert('Item successfully updated');

        fetchTodos();
        //fetchTodos()
      }
    } catch (error) {
      console.log(error);
    }

    // alert updated status of todo
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        todos,
        setTodos,
        error,
        fetchTodos,
        deleteTodo,
        sortedTodos,
        sortOption,
        setSortOption,
        selectedFilter,
        setSelectedFilter,
        categories,
        setCategories,
        updatePriorityStatus,
        updateCompletion,
        selectedColorFilter,
        setSelectedColorFilter,
        colorsInUse,
        setColorsInUse,
        updateFilterColors,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
