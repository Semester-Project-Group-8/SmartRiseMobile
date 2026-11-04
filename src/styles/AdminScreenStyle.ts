import { StyleSheet } from 'react-native';

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileLetter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  waitingBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fed7aa',
    backgroundColor: '#fff7ed',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  waitingText: {
    fontWeight: '600',
  },

  manageButton: {
    flex: 1,
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageText: {
    fontSize: 15,
    fontWeight: '600',
  },

  liftButton: {
    height: 60,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  liftText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  logoutButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    color: '#b91c1c',
    fontWeight: '600',
  },
});