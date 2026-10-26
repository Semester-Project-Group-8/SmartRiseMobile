plugins {
    alias(libs.plugins.android.library)
    id("maven-publish")
}

android {
    namespace = "sdu.vectrex.ibeacon"
    compileSdk {
        version = release(37)
    }

    defaultConfig {
        minSdk = 26
        consumerProguardFiles("consumer-rules.pro")
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    publishing {
        singleVariant("relese"){
            withSourcesJar()
        }
    }
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "sdu.vectrex"
            artifactId = "background-ibeacon"
            version = "0.1.0"

            afterEvaluate {
                from(components["release"])
            }

            pom {
                name.set("Background iBeacon")
                description.set(
                    "Android background iBeacon detection library"
                )
            }
        }
    }

    repositories {
        maven {
            name = "localRelease"
            url = uri(
                layout.buildDirectory.dir("repository")
            )
        }
    }
}

dependencies {
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.core.ktx)
    implementation(libs.material)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(libs.androidx.junit)
}