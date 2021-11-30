{/* <Modal
testID={"modal"}
isVisible={openExerciseModalModal}
onSwipeComplete={() => setOpenExerciseModal(false)}
swipeDirection={["down"]}
style={styles.view}
>
<SafeAreaView style={styles.view}>
    <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
    />
</SafeAreaView>
</Modal> */}