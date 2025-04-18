import { StyleSheet } from 'react-native';

const commonStyles = {
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    width: '100%',
  },
  result: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  city: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  metrics: {
    marginTop: 15,
    paddingTop: 10,
  },
  metric: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    marginTop: 5,
    fontSize: 16,
  },
};

export const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#333',
  },
  input: {
    ...commonStyles.input,
    borderColor: '#ccc',
    color: '#000',
  },
  result: {
    ...commonStyles.result,
    backgroundColor: '#f0f0f0',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
  },
  label: commonStyles.label,
});

export const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#f5f5f5',
  },
  input: {
    ...commonStyles.input,
    borderColor: '#444',
    color: '#fff',
  },
  result: {
    ...commonStyles.result,
    backgroundColor: '#1e1e1e',
  },
  city: {
    ...commonStyles.city,
    color: '#fff',
  },
  temp: {
    ...commonStyles.temp,
    color: '#fff',
  },
  description: {
    ...commonStyles.description,
    color: '#aaa',
  },
  metrics: commonStyles.metrics,
  metric: {
    ...commonStyles.metric,
    color: '#ddd',
  },
  error: {
    color: '#ff5c5c',
    textAlign: 'center',
    marginTop: 15,
  },
  label: {
    ...commonStyles.label,
    color: '#ccc',
  },
});
