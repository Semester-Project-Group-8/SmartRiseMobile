import { StyleSheet } from "react-native";

export const NewUsersStyle = StyleSheet.create({

    Headertext:{
        backgroundColor:"#2563eb",
        color:"#FFFFFF",
        textAlign:"center",
        margin:15,
        paddingVertical:12,
        paddingHorizontal:15,
        borderRadius:15,
        overflow:"hidden",
        fontSize: 18,
        fontWeight:"bold",
    },

    Container:{
        backgroundColor:"#FFFFFF",
        marginHorizontal:15,
        marginBottom:15,
        padding:18,
        borderRadius:20,
        gap:6,
        shadowColor:"#000000",
        shadowOffset:{ width: 0, height: 2 },
        shadowOpacity:0.08,
        shadowRadius:8,
        elevation:3,
    },

    ProfileLogo:{
        width: 44,
        height: 44,
        borderRadius: 999,
        backgroundColor:"#2563eb",
        color:"#FFFFFF",
        textAlign:"center",
        lineHeight: 44,
        overflow:"hidden",
        fontSize:22,
        fontWeight:"bold",
    },

    ProfileName:{
        fontSize:18,
        fontWeight:"bold",
        color:"#111827",
    },

    ProfileText:{
        fontSize:15,
        fontWeight:"600",
        color:"#6b7280",
        marginTop:8,
        marginBottom:8,
    },

    RequestRow:{
        flexDirection: "row",
        alignItems:"center",
        gap: 10,
        marginBottom:10,
    },

    Divider:{
        height:1,
        backgroundColor:"#e5e7eb",
        marginVertical:6,
    },

    RolePressable:{
        backgroundColor:"#dbeafe",
        borderRadius:999,
        borderWidth:1,
        borderColor:"#bfdbfe",
        paddingVertical:8,
        paddingHorizontal:18,
        alignItems:"center",
    },

    RoleSelected:{
        backgroundColor:"#2563eb",
        borderColor:"#2563eb",
    },

    PressableText:{
        color:"#2563eb",
        fontSize:15,
        fontWeight:"600",
    },

    PressableTextSelected:{
        color:"#FFFFFF",
    },

    Desks:{
        gap:8,
        marginBottom:10,
    },

    DeskPressable:{
        backgroundColor:"#f3f4f6",
        borderRadius:12,
        paddingVertical:12,
        paddingHorizontal:15,
    },

    DeskText:{
        fontSize:15,
        color:"#111827",
    },

    ActionRow:{
        flexDirection:"row",
        gap:10,
        marginTop:8,
    },

    AcceptButton:{
        flex:1,
        backgroundColor:"#16a34a",
        borderRadius: 12,
        paddingVertical:12,
        alignItems:"center",
    },

    RejectButton:{
        flex:1,
        backgroundColor:"#FFFFFF",
        borderRadius: 12,
        borderWidth:1,
        borderColor:"#dc2626",
        paddingVertical:12,
        alignItems:"center",
    },

    AcceptText:{
        color:"#FFFFFF",
        fontSize:16,
        fontWeight:"bold",
    },

    RejectText:{
        color:"#dc2626",
        fontSize:16,
        fontWeight:"bold",
    },

    ButtonPressed:{
        opacity:0.8,
        transform:[{ scale: 0.97 }],
    },
})
