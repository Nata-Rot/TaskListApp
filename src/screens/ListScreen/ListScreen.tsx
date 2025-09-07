import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchList } from '../../store/slices/listSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { ListItem } from '../../types';
import { AppDispatch } from '../../store';

// Icon components
const RemoteIcon = () => (
  <Text style={iconStyles.icon}>🌐</Text>
);

const EmptyIcon = () => (
  <View style={iconStyles.emptyIcon}>
    <Text style={iconStyles.emptyIconText}>📦</Text>
  </View>
);

// Componente simple para mostrar el avatar - actualizado para aceptar string | undefined
const AvatarImage: React.FC<{ uri: string | null | undefined }> = ({ uri }) => {
  if (!uri) {
    return (
      <View style={[styles.avatar, styles.avatarPlaceholder]}>
        <Text style={styles.avatarPlaceholderText}>👤</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={styles.avatar}
      onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
      testID="item-avatar"
    />
  );
};

export const ListScreen: React.FC = () => {
  const { items, loading, error } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.itemContainer} testID="list-item">
      <View style={styles.itemContent}>
        <Text style={styles.itemName} testID="item-name">
          {item.name}
        </Text>
        <Text style={styles.itemId}>ID: {item.id}</Text>
      </View>
      <AvatarImage uri={item.avatar} />
    </View>
  );

  if (loading) {
    return <LoadingSpinner message="Loading items..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <RemoteIcon />
          <Text style={styles.title}>Remote List ({items.length})</Text>
        </View>
      </View>
      
      {items.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <EmptyIcon />
          <Text style={styles.emptyText}>No items found</Text>
          <Text style={styles.emptySubtext}>Pull to refresh or check your connection</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          testID="remote-list"
        />
      )}
    </View>
  );
};

// Icon styles
const iconStyles = StyleSheet.create({
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 40,
  },
});

// Main styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  itemId: {
    fontSize: 14,
    color: '#7f8c8d',
    fontFamily: 'monospace',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  avatarPlaceholder: {
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});