import { StyleSheet, View } from 'react-native';
import { React, useState, useCallback } from 'react'
import { Text, Divider, List, ListItem, Button } from '@ui-kitten/components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native"

export default function AllNotes() {
    const [notes, setNotes] = useState([])
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
    const renderItem = ({ item, index }) => (
        <View>

            <ListItem
                title={<Text style={{ fontSize: 40 }}>{item}</Text>}
                onPress={() => {
                    Navigation.navigate("Note", {
                        singleNote: item,
                    })
                }}
                style={styles.item}
            />

        </View>
    );
    return (
        <View style={{ backgroundColor: "#222B45", flex: 1 }}>
            <Text style={styles.title} category="h1">
                Notes
            </Text>
            <List
                style={styles.container}
                data={notes.reverse()}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20
    },
    item: {
        margin: 14,
    },
    title: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 50,
    },
    notes: {
        fontSize: 24,
    }
});