import { StyleSheet, View } from 'react-native';
import { React, useState, useCallback } from 'react'
import { Text, Button } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native"

export default function Note({ route }) {
    const [notes, setNotes] = useState([])
    const { singleNote } = route.params
    const Navigation = useNavigation()
    const getNotes = () => {
        AsyncStorage.getItem("NOTES").then((notes) => {
            setNotes(JSON.parse(notes))
        })
    }

    useFocusEffect(
        useCallback(() => {
            getNotes()
        }, [])
    )

    const deleteNote = async () => {
        const newNotes = await notes.filter((note) => note !== singleNote)
        await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes)).then(() => {
            Navigation.navigate("All Notes")
        })
    }
    return (
        <View style={{ backgroundColor: "#222B45", flex: 1 }}>
            <Text style={styles.title} category="h1">
                Note
            </Text>
            <Text style={{ fontSize: 22, margin: 20 }} category="h1">
                {singleNote}
            </Text>
            <View style={styles.bottom}>
                <Button onPress={deleteNote} style={styles.button}>Delete</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20
    },
    bottom: {
        flex: 1, justifyContent: 'flex-end', marginBottom: 36,
    },
    button: {
        marginBottom: 30
    },
    title: {
        textAlign: "center",
        marginTop: 50
    },
});