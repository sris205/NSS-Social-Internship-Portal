import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import tree from "../assets/tree.jpg";
import blood from "../assets/blood.jpg";
import education from "../assets/education.jpg";
import clean from "../assets/clean.jpg";


function Home() {
  return (
    <>

      <div className="bg-gray-50">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <img
                src={hero}
                alt="NSS Activity"
                className="
                  w-full
                  max-w-4xl
                  mx-auto
                  rounded-2xl
                  shadow-2xl
                  mb-10
                "
              />

            <h1 className="text-6xl font-extrabold mb-6">
              NSS Social Internship Portal
            </h1>

            <p className="text-2xl italic font-semibold text-yellow-300 mb-6">
            "Not Me But You"
          </p>

            <p className="text-xl max-w-3xl mx-auto mb-10">
              Empowering students through social service,
              leadership development, community engagement,
              and nation building.
            </p>

            <div className="flex flex-wrap justify-center gap-6">

              <Link to="/student-register">
                <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition">
                  Register Now
                </button>
              </Link>

              <Link to="/student-login">
                <button className="bg-green-500 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-green-600 transition">
                  Student Login
                </button>
              </Link>

            </div>
          </div>
        </section>

        {/* About NSS */}
        <section
          id="about"
          className="max-w-6xl mx-auto py-20 px-6"
        >

          <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
            About NSS
          </h2>

          <p className="text-lg text-gray-700 text-center leading-8">
            The National Service Scheme (NSS) is a public service
            initiative that encourages students to participate in
            community welfare, environmental protection, social
            awareness programs, and nation-building activities.
            Through NSS internships, students develop leadership,
            teamwork, and social responsibility while serving society.
          </p>

        </section>

        {/* Activities */}
        <section
          id="activities"
          className="bg-white py-20"
        >

          <h2 className="text-4xl font-bold text-center mb-12 text-blue-700">
            Our Activities
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="
                      bg-green-100
                        p-8
                        rounded-2xl
                        shadow-lg
                        text-center
                        hover:shadow-2xl
                        hover:-translate-y-2
                        transition
                        duration-300
                      ">
            
                <img
                    src={tree}
                    alt="Tree Plantation"
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
              
              <h3 className="font-bold text-xl">
                Tree Plantation
              </h3>
            </div>

            <div className="
                  bg-red-100
                    p-8
                    rounded-2xl
                    shadow-lg
                    text-center
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition
                    duration-300
           ">
             <img
                src={blood}
                alt="Blood Donation"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl">
                Blood Donation
              </h3>
            </div>

            <div className="
                  bg-blue-100
                    p-8
                    rounded-2xl
                    shadow-lg
                    text-center
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition
                    duration-300
                ">
             <img
                src={education}
                alt="Education Support"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl">
                Education Support
              </h3>
            </div>

            <div className="
                  bg-yellow-100
                    p-8
                    rounded-2xl
                    shadow-lg
                    text-center
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition
                    duration-300
            ">
            <img
                src={clean}
                alt="Cleanliness Drive"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl">
                Cleanliness Drive
              </h3>
            </div>

          </div>

        </section>

        {/* Impact Section */}
        <section className="bg-blue-700 text-white py-20">

          <h2 className="text-4xl font-bold text-center mb-12">
            NSS Impact
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-5xl font-bold">500+</h3>
              <p className="mt-2">Students</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">100+</h3>
              <p className="mt-2">Activities</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">1000+</h3>
              <p className="mt-2">Service Hours</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">50+</h3>
              <p className="mt-2">Communities Reached</p>
            </div>

          </div>

        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">

          <h2 className="text-4xl font-bold mb-6 text-blue-700">
            Ready to Join NSS?
          </h2>

          <p className="text-gray-600 mb-10">
            Register today and start contributing towards
            meaningful social impact.
          </p>

          <div className="flex justify-center flex-wrap gap-6">

            <Link to="/student-register">
              <button className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600">
                Register
              </button>
            </Link>

            <Link to="/student-login">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700">
                Student Login
              </button>
            </Link>

            <Link to="/admin-login">
              <button className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700">
                Admin Login
              </button>
            </Link>

          </div>

        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="bg-black text-white py-14"
        >

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="text-2xl font-bold mb-4">
                NSS Portal
              </h3>

              <p className="text-gray-400">
                A platform for managing NSS internships,
                daily reports, student participation,
                and certificate generation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                Quick Links
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>Home</li>
                <li>About NSS</li>
                <li>Activities</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                Contact
              </h3>

              <p className="text-gray-400">
                📧 nssportal@gmail.com
              </p>

              <p className="text-gray-400">
                📍 MMMUT Gorakhpur
              </p>

              <p className="text-gray-400">
                📞 +91 XXXXX XXXXX
              </p>
            </div>

          </div>

          <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
            © 2026 NSS Internship Management Portal. All Rights Reserved.
          </div>

        </footer>

      </div>
    </>
  );
}

export default Home;