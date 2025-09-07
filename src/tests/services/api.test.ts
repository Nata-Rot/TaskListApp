import { fetchListData } from '../../services/api';

// Mock fetch
(globalThis.fetch as any) = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API Service', () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  it('fetchListData should return data on successful response', async () => {
    const mockData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    } as any);

    const result = await fetchListData();
    
    expect(result).toEqual(mockData);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://6172cfe5110a740017222e2b.mockapi.io/elements'
    );
  });

  it('fetchListData should throw error on failed response', async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: false,
    } as any);

    await expect(fetchListData()).rejects.toThrow('Network response was not ok');
  });

  it('fetchListData should throw error on network failure', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchListData()).rejects.toThrow('Network error');
  });
});